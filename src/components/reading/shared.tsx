import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  BookOpen,
  House,
  LibraryBig,
  Play,
  UserRound,
  Menu,
  ArrowRight,
  Clock,
  Star,
  Sparkles,
  Eye,
  EyeOff,
  LockKeyhole,
  WandSparkles,
  Leaf,
  Gem,
  Pencil,
  PartyPopper,
  ChevronRight,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useReading } from "./store";
import { type Story, type Category } from "./data";
export const navItems = [
  { to: "/" as const, label: "Գլխավոր", icon: House },
  { to: "/library" as const, label: "Գրադարան", icon: LibraryBig },
  { to: "/cartoons" as const, label: "Մուլտֆիլմեր", icon: Play },
  { to: "/student" as const, label: "Իմ անկյունը", icon: UserRound },
];
export function SiteShell({ children }: { children: ReactNode }) {
  const path = useLocation({ select: (l) => l.pathname });
  const [menu, setMenu] = useState(false);
  const [login, setLogin] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.code === "KeyA") {
        e.preventDefault();
        setLogin(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <>
      <header className="site-header">
        <div className="container-width flex items-center justify-between gap-5">
          <Link to="/" className="brand">
            <span className="brand-mark">
              <BookOpen size={27} />
              <Sparkles className="brand-spark" size={12} />
            </span>
            <span>
              Փոքրիկ
              <br />
              <strong>ընթերցասերներ</strong>
            </span>
          </Link>
          <nav className="desktop-nav">
            {navItems.map((n) => (
              <Link key={n.to} to={n.to} className={path === n.to ? "nav-link active" : "nav-link"}>
                <n.icon size={17} />
                {n.label}
              </Link>
            ))}
          </nav>
          <Button asChild className="student-nav">
            <Link to="/student">
              <UserRound />
              Իմ էջը
              <ChevronRight />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="mobile-menu"
            aria-label="Բացել ընտրացանկը"
            onClick={() => setMenu(!menu)}
          >
            <Menu />
          </Button>
        </div>
        {menu && (
          <nav className="mobile-nav">
            {navItems.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setMenu(false)} className="nav-link">
                <n.icon size={18} />
                {n.label}
              </Link>
            ))}
          </nav>
        )}
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="container-width footer-grid">
          <div>
            <Link to="/" className="brand">
              <span className="brand-mark">
                <BookOpen />
              </span>
              <span>
                Փոքրիկ
                <br />
                <strong>ընթերցասերներ</strong>
              </span>
            </Link>
            <p>
              Փոքրիկ ընթերցողներ, մեծ երազանքներ։
              <br />
              Մեր դպրոցական ընթերցանության ակումբը։
            </p>
          </div>
          <div>
            <h3>Բացահայտիր</h3>
            <Link to="/library">Գրադարան</Link>
            <Link to="/cartoons">Մուլտֆիլմերի աշխարհ</Link>
            <Link to="/student">Իմ անկյունը</Link>
          </div>
          <div>
            <h3>Մեր ակումբը</h3>
            <p>3–4-րդ դասարանների համար</p>
            <p>Կապ՝ դպրոցի ընթերցանության ակումբի միջոցով</p>
            <span className="demo-label">Ցուցադրական հարթակ</span>
          </div>
        </div>
        <div className="container-width footer-bottom">
          <span>© 2026 Փոքրիկ ընթերցասերներ</span>
          <span>
            Ստեղծված է սիրով՝ փոքրիկ ընթերցողների համար <Heart size={13} />
          </span>
        </div>
      </footer>
      <Dialog open={login} onOpenChange={setLogin}>
        <DialogContent>
          <DialogTitle className="flex gap-2 items-center">
            <LockKeyhole className="text-primary" />
            Կառավարչի մուտք
          </DialogTitle>
          <DialogDescription>
            Իրական մուտքը դեռ միացված չէ։ Այստեղ կարող եք դիտել միայն ցուցադրական տվյալները։
          </DialogDescription>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setBusy(true);
              setError("");
              setTimeout(() => {
                setBusy(false);
                setError(
                  "Մուտքի ծառայությունը դեռ միացված չէ։ Գաղտնաբառերը չեն ստուգվում կամ պահպանվում։",
                );
              }, 500);
            }}
          >
            <label className="form-label">
              Էլ. փոստ կամ օգտանուն
              <Input required autoComplete="username" />
            </label>
            <label className="form-label">
              Գաղտնաբառ
              <div className="relative">
                <Input
                  required
                  type={show ? "text" : "password"}
                  autoComplete="current-password"
                  className="pr-12"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="absolute right-1 top-1"
                  aria-label={show ? "Թաքցնել գաղտնաբառը" : "Ցույց տալ գաղտնաբառը"}
                  onClick={() => setShow(!show)}
                >
                  {show ? <EyeOff /> : <Eye />}
                </Button>
              </div>
            </label>
            {error && (
              <p role="alert" className="text-destructive text-sm">
                {error}
              </p>
            )}
            <Button className="w-full" disabled={busy}>
              {busy ? "Սպասեք…" : "Մուտք գործել"}
            </Button>
          </form>
          <Button asChild variant="outline">
            <Link to="/admin" onClick={() => setLogin(false)}>
              Դիտել ցուցադրական կառավարման բաժինը
              <ArrowRight />
            </Link>
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
export function PageHeading({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <div className="page-heading">
      {eyebrow && (
        <span className="eyebrow">
          <Sparkles size={15} />
          {eyebrow}
        </span>
      )}
      <div className="flex items-start justify-between gap-5 flex-wrap">
        <div>
          <h1>{title}</h1>
          {description && <p>{description}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}
export function StoryCard({ story }: { story: Story }) {
  const { categories } = useReading();
  return (
    <article className="story-card">
      <Link to="/story/$id" params={{ id: story.id }} className="story-image">
        <img src={story.image} alt={story.title} loading="lazy" width={1024} height={768} />
        <span
          className={`category-tag tone-${categories.find((c) => c.id === story.category)?.tone || "mint"}`}
        >
          {story.category === "fairy"
            ? "Հեքիաթ"
            : story.category === "fable"
              ? "Առակ"
              : "Պատմություն"}
        </span>
      </Link>
      <div className="story-card-body">
        <span className="author">{story.author}</span>
        <Link to="/story/$id" params={{ id: story.id }}>
          <h3>{story.title}</h3>
        </Link>
        <p>{story.description}</p>
        <div className="story-card-bottom">
          <span>
            <Clock size={14} />
            {story.minutes} րոպե <span className="dot">·</span> 3–4 դասարան
          </span>
          <Button asChild variant="ghost" size="sm">
            <Link to="/story/$id" params={{ id: story.id }}>
              Կարդալ
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
const categoryIcons = {
  book: BookOpen,
  wand: WandSparkles,
  leaf: Leaf,
  gem: Gem,
  pencil: Pencil,
  party: PartyPopper,
};
export function CategoryCard({ category, index }: { category: Category; index: number }) {
  const Icon = categoryIcons[category.icon as keyof typeof categoryIcons] || BookOpen;
  return (
    <Link
      to="/categories/$id"
      params={{ id: category.id }}
      className={`category-card tone-${category.tone}`}
    >
      <div className="flex justify-between items-center">
        <span className="category-icon">
          <Icon size={25} />
        </span>
        <span className="category-number">0{index + 1}</span>
      </div>
      <h3>{category.title}</h3>
      <p>{category.description}</p>
      <span className="category-explore">
        Բացահայտել <ArrowRight size={17} />
      </span>
    </Link>
  );
}
export function ProgressBar({ value }: { value: number }) {
  return (
    <div
      className="progress-track"
      role="progressbar"
      aria-label="Առաջընթաց"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}
export function EmptyState({ text = "Այստեղ դեռ պատմություններ չկան։" }: { text?: string }) {
  return (
    <div className="empty-state">
      <BookOpen size={35} />
      <h3>{text}</h3>
      <Button asChild variant="outline">
        <Link to="/library">Վերադառնալ գրադարան</Link>
      </Button>
    </div>
  );
}
export function DemoNote() {
  return (
    <p className="demo-note">
      <Star size={15} />
      Ցուցադրական տվյալներ · Փոփոխությունները գործում են միայն այս այցի ընթացքում։
    </p>
  );
}
