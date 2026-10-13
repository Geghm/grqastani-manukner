import { useState, type ReactNode, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  LayoutDashboard,
  FileQuestion,
  Layers,
  Film,
  Users,
  Settings,
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  ArrowUp,
  ArrowDown,
  Download,
  Search,
  Eye,
  Check,
  Upload,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useReading } from "./store";
import { PageHeading, DemoNote } from "./shared";
import { VideoPlayer } from "./cartoons";
import {
  sampleStudents,
  kindLabels,
  fox,
  videoSource,
  type Story,
  type Question,
  type QuestionKind,
  type Category,
  type Video,
} from "./data";
const tabs = [
  { id: "overview", label: "Ընդհանուր պատկեր", icon: LayoutDashboard },
  { id: "stories", label: "Պատմություններ", icon: BookOpen },
  { id: "questions", label: "Հարցեր և հարցաշարեր", icon: FileQuestion },
  { id: "categories", label: "Բաժիններ", icon: Layers },
  { id: "videos", label: "Մուլտֆիլմեր", icon: Film },
  { id: "students", label: "Աշակերտների արդյունքներ", icon: Users },
  { id: "settings", label: "Կայքի կարգավորումներ", icon: Settings },
];
type Edit =
  | { type: "story"; item: Story }
  | { type: "question"; item: Question }
  | { type: "category"; item: Category }
  | { type: "video"; item: Video };
export function AdminPage() {
  const state = useReading();
  const {
    stories,
    setStories,
    categories,
    setCategories,
    questions,
    setQuestions,
    videos,
    setVideos,
    submissions,
  } = state;
  const [tab, setTab] = useState("overview");
  const [edit, setEdit] = useState<Edit | null>(null);
  const [remove, setRemove] = useState<{ label: string; action: () => void } | null>(null);
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [storyFilter, setStoryFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [preview, setPreview] = useState<Video | null>(null);
  const [notice, setNotice] = useState("");
  const [mobile, setMobile] = useState(false);
  const add = () => {
    const id = crypto.randomUUID();
    if (tab === "stories")
      setEdit({
        type: "story",
        item: {
          id,
          title: "",
          author: "",
          description: "",
          category: categories[0]?.id || "welcome",
          image: fox,
          minutes: 5,
          status: "Նախագիծ",
          content: [],
        },
      });
    if (tab === "questions")
      setEdit({
        type: "question",
        item: {
          id,
          storyId: stories[0]?.id || "fox",
          kind: "choice",
          title: "",
          options: [],
          correct: "",
          points: 1,
        },
      });
    if (tab === "categories")
      setEdit({
        type: "category",
        item: { id, title: "", icon: "book", description: "", tone: "mint" },
      });
    if (tab === "videos")
      setEdit({
        type: "video",
        item: {
          id,
          title: "",
          description: "",
          category: "Հեքիաթներ",
          image: fox,
          url: "",
          status: "Նախագիծ",
        },
      });
  };
  const save = (value: Edit) => {
    if (value.type === "story") setStories((old) => upsert(old, value.item));
    if (value.type === "question") setQuestions((old) => upsert(old, value.item));
    if (value.type === "category") setCategories((old) => upsert(old, value.item));
    if (value.type === "video") setVideos((old) => upsert(old, value.item));
    setEdit(null);
    setNotice("Փոփոխությունը պահպանված է այս ցուցադրական այցի համար։");
  };
  const exportCsv = () => {
    const rows = [
      ["Տվյալների տեսակ", "Անուն", "Դասարան", "Պատմություն", "Միավոր", "Առավելագույն", "Ամսաթիվ"],
      ...filteredStudents.map((s) => [
        "Ցուցադրական",
        `${s.name} ${s.surname}`,
        s.className,
        "",
        String(s.score),
        "100",
        "",
      ]),
      ...filteredSubmissions.map((s) => [
        "Այս այցի ցուցադրություն",
        s.name,
        s.className,
        stories.find((st) => st.id === s.storyId)?.title || "",
        String(s.earned),
        String(s.total),
        s.date,
      ]),
    ];
    const csv =
      "\uFEFF" +
      rows.map((r) => r.map((v) => '"' + v.replaceAll('"', '""') + '"').join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "ընթերցասերներ-ցուցադրական-արդյունքներ.csv";
    a.click();
    URL.revokeObjectURL(url);
  };
  const filteredStudents = sampleStudents.filter(
    (s) =>
      `${s.name} ${s.surname}`.includes(search) &&
      (classFilter === "all" || s.className === classFilter) &&
      storyFilter === "all" &&
      !dateFilter,
  );
  const filteredSubmissions = submissions.filter(
    (s) =>
      s.name.includes(search) &&
      (classFilter === "all" || s.className === classFilter) &&
      (storyFilter === "all" || s.storyId === storyFilter) &&
      (!dateFilter || s.date.startsWith(dateFilter)),
  );
  return (
    <div className="admin-layout">
      <aside className={mobile ? "admin-sidebar is-open" : "admin-sidebar"}>
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
        <span className="admin-caption">ԿԱՌԱՎԱՐՄԱՆ ԲԱԺԻՆ</span>
        <nav>
          {tabs.map((t) => (
            <Button
              key={t.id}
              variant="ghost"
              className={tab === t.id ? "admin-tab active" : "admin-tab"}
              onClick={() => {
                setTab(t.id);
                setSearch("");
                setMobile(false);
                setNotice("");
              }}
            >
              <t.icon />
              {t.label}
            </Button>
          ))}
        </nav>
        <div className="admin-sidebar-bottom">
          <span className="demo-label">Ցուցադրական միջավայր</span>
          <Link to="/" className="back-link">
            <ArrowLeft size={15} />
            Վերադառնալ կայք
          </Link>
        </div>
      </aside>
      <div className="admin-main">
        <div className="admin-topbar">
          <Button
            variant="ghost"
            size="icon"
            className="admin-menu"
            aria-label="Կառավարման ընտրացանկ"
            onClick={() => setMobile(!mobile)}
          >
            {mobile ? <X /> : <Menu />}
          </Button>
          <span>Դպրոցական ընթերցանության ակումբ</span>
          <span className="demo-label">Իրական մուտք չկա</span>
        </div>
        <div className="admin-content">
          <PageHeading
            title={tabs.find((t) => t.id === tab)?.label || ""}
            description="Հարթակի կառավարում և ընթերցողների հաջողություններ"
          >
            {["stories", "questions", "categories", "videos"].includes(tab) && (
              <Button onClick={add}>
                <Plus />
                Ավելացնել
              </Button>
            )}
            {tab === "students" && (
              <Button variant="outline" onClick={exportCsv}>
                <Download />
                Արտահանել CSV
              </Button>
            )}
          </PageHeading>
          <DemoNote />
          {notice && (
            <p role="status" className="admin-notice">
              <Check size={16} />
              {notice}
            </p>
          )}
          {tab === "overview" && (
            <>
              <div className="admin-stats">
                {[
                  { label: "Աշակերտներ", value: sampleStudents.length, icon: Users },
                  { label: "Պատմություններ", value: stories.length, icon: BookOpen },
                  {
                    label: "Հարցաշարեր / հարցեր",
                    value: `${new Set(questions.map((q) => q.storyId)).size} / ${questions.length}`,
                    icon: FileQuestion,
                  },
                  { label: "Մուլտֆիլմեր", value: videos.length, icon: Film },
                ].map((s) => (
                  <div className="admin-stat" key={s.label}>
                    <s.icon />
                    <span>{s.label}</span>
                    <strong>{s.value}</strong>
                    <small>Ցուցադրական տվյալներ</small>
                  </div>
                ))}
              </div>
              <div className="admin-overview-columns">
                <section>
                  <h2>Դասարանների առաջընթացը</h2>
                  {["3Ա", "3Բ", "4Ա", "4Բ"].map((c, i) => (
                    <div key={c} className="class-progress">
                      <span>{c} դասարան</span>
                      <progress max={100} value={[92, 96, 78, 85][i]} />
                      <strong>{[92, 96, 78, 85][i]}%</strong>
                    </div>
                  ))}
                  <p className="text-muted-foreground text-sm mt-5">
                    Միջին ցուցադրական գնահատական՝ 88%
                  </p>
                </section>
                <section>
                  <h2>Բովանդակության վիճակը</h2>
                  <div className="overview-count">
                    <span>Հրապարակված պատմություններ</span>
                    <strong>{stories.filter((s) => s.status === "Հրապարակված").length}</strong>
                  </div>
                  <div className="overview-count">
                    <span>Նախագծեր</span>
                    <strong>{stories.filter((s) => s.status === "Նախագիծ").length}</strong>
                  </div>
                  <div className="overview-count">
                    <span>Այս այցի հարցաշարեր</span>
                    <strong>{submissions.length}</strong>
                  </div>
                </section>
              </div>
              <section className="admin-section">
                <h2>Վերջին ակտիվությունը</h2>
                <AdminTable
                  headers={["Աշակերտ", "Դասարան", "Գործողություն", "Արդյունք"]}
                  rows={[
                    ...submissions
                      .slice(-4)
                      .reverse()
                      .map((s) => [
                        s.name,
                        s.className,
                        stories.find((st) => st.id === s.storyId)?.title || "",
                        `${s.earned} / ${s.total}`,
                      ]),
                    ...sampleStudents
                      .slice(0, 3)
                      .map((s) => [
                        `${s.name} ${s.surname}`,
                        s.className,
                        "Ցուցադրական ավարտած հարցաշար",
                        `${s.score}%`,
                      ]),
                  ]}
                />
              </section>
            </>
          )}
          {tab === "stories" && (
            <>
              <SearchBox value={search} onChange={setSearch} />
              <AdminTable
                headers={["Պատմություն", "Հեղինակ", "Բաժին", "Վիճակ", "Գործողություններ"]}
                rows={stories
                  .filter((s) => `${s.title} ${s.author}`.includes(search))
                  .map((s) => [
                    <div className="table-story">
                      <img src={s.image} alt="" />
                      {s.title}
                    </div>,
                    s.author,
                    categories.find((c) => c.id === s.category)?.title,
                    <span className="status-tag">{s.status}</span>,
                    <Actions
                      onEdit={() => setEdit({ type: "story", item: s })}
                      onDelete={() =>
                        setRemove({
                          label: s.title,
                          action: () => {
                            setStories((old) => old.filter((x) => x.id !== s.id));
                            setQuestions((old) => old.filter((q) => q.storyId !== s.id));
                          },
                        })
                      }
                    />,
                  ])}
              />
            </>
          )}
          {tab === "questions" && (
            <>
              <SearchBox value={search} onChange={setSearch} />
              <AdminTable
                headers={["Հարց", "Տեսակ", "Պատմություն", "Միավոր", "Հերթ", "Գործողություններ"]}
                rows={questions
                  .filter((q) => q.title.includes(search))
                  .map((q) => [
                    q.title,
                    kindLabels[q.kind],
                    stories.find((s) => s.id === q.storyId)?.title,
                    q.points,
                    <Reorder
                      onUp={() => setQuestions((old) => reorder(old, q.id, -1))}
                      onDown={() => setQuestions((old) => reorder(old, q.id, 1))}
                      first={questions[0]?.id === q.id}
                      last={questions.at(-1)?.id === q.id}
                    />,
                    <Actions
                      onEdit={() => setEdit({ type: "question", item: q })}
                      onDelete={() =>
                        setRemove({
                          label: q.title,
                          action: () => setQuestions((old) => old.filter((x) => x.id !== q.id)),
                        })
                      }
                    />,
                  ])}
              />
            </>
          )}
          {tab === "categories" && (
            <AdminTable
              headers={["Բաժին", "Նկարագրություն", "Պատմություններ", "Հերթ", "Գործողություններ"]}
              rows={categories.map((c, i) => [
                c.title,
                c.description,
                stories.filter((s) => s.category === c.id).length,
                <Reorder
                  first={i === 0}
                  last={i === categories.length - 1}
                  onUp={() => setCategories((old) => reorder(old, c.id, -1))}
                  onDown={() => setCategories((old) => reorder(old, c.id, 1))}
                />,
                <Actions
                  onEdit={() => setEdit({ type: "category", item: c })}
                  onDelete={() => {
                    if (stories.some((s) => s.category === c.id)) {
                      setNotice("Նախ տեղափոխեք այս բաժնի պատմությունները այլ բաժին։");
                      return;
                    }
                    setRemove({
                      label: c.title,
                      action: () => setCategories((old) => old.filter((x) => x.id !== c.id)),
                    });
                  }}
                />,
              ])}
            />
          )}
          {tab === "videos" && (
            <>
              <SearchBox value={search} onChange={setSearch} />
              <AdminTable
                headers={["Մուլտֆիլմ", "Բաժին", "Աղբյուր", "Վիճակ", "Գործողություններ"]}
                rows={videos
                  .filter((v) => v.title.includes(search))
                  .map((v) => [
                    v.title,
                    v.category,
                    v.url ? "Տեսանյութի հղում" : "Դեռ ավելացված չէ",
                    v.status,
                    <div className="flex">
                      <Button
                        size="icon"
                        variant="ghost"
                        aria-label={`Նախադիտել ${v.title}`}
                        onClick={() => setPreview(v)}
                      >
                        <Eye />
                      </Button>
                      <Actions
                        onEdit={() => setEdit({ type: "video", item: v })}
                        onDelete={() =>
                          setRemove({
                            label: v.title,
                            action: () => setVideos((old) => old.filter((x) => x.id !== v.id)),
                          })
                        }
                      />
                    </div>,
                  ])}
              />
            </>
          )}
          {tab === "students" && (
            <>
              <div className="admin-filters">
                <SearchBox value={search} onChange={setSearch} />
                <select
                  aria-label="Ֆիլտրել ըստ դասարանի"
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                >
                  <option value="all">Բոլոր դասարանները</option>
                  {["3Ա", "3Բ", "4Ա", "4Բ"].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
                <select
                  aria-label="Ֆիլտրել ըստ պատմության և հարցաշարի"
                  value={storyFilter}
                  onChange={(e) => setStoryFilter(e.target.value)}
                >
                  <option value="all">Բոլոր պատմություններն ու հարցաշարերը</option>
                  {stories.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                </select>
                <Input
                  type="date"
                  aria-label="Ավարտելու ամսաթիվ"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </div>
              <AdminTable
                headers={[
                  "Անուն, ազգանուն",
                  "Դասարան",
                  "Ավարտած պատմություններ",
                  "Գնահատական",
                  "Մանրամասներ",
                ]}
                rows={filteredStudents.map((s) => [
                  `${s.name} ${s.surname}`,
                  s.className,
                  s.completed,
                  `${s.score}%`,
                  <Button variant="ghost" size="sm" onClick={() => setSelectedStudent(s.id)}>
                    <Eye />
                    Դիտել
                  </Button>,
                ])}
              />
              <section className="admin-section">
                <h2>Այս այցի իրական լրացումները՝ ցուցադրական միջավայրում</h2>
                <AdminTable
                  headers={["Ընթերցող", "Պատմություն", "Միավոր", "Մանրամասներ"]}
                  rows={filteredSubmissions.map((s) => [
                    s.name,
                    stories.find((st) => st.id === s.storyId)?.title,
                    `${s.earned} / ${s.total}`,
                    <Button variant="ghost" onClick={() => setSelectedStudent(s.id)}>
                      <Eye />
                      Դիտել
                    </Button>,
                  ])}
                />
              </section>
            </>
          )}
          {tab === "settings" && (
            <SettingsForm
              onSaved={() => setNotice("Կարգավորումները կիրառված են այս այցի համար։")}
            />
          )}
        </div>
      </div>
      {edit && <EditModal edit={edit} onSave={save} onClose={() => setEdit(null)} />}
      <Dialog
        open={!!remove}
        onOpenChange={(o) => {
          if (!o) setRemove(null);
        }}
      >
        <DialogContent>
          <DialogTitle>Ջնջե՞լ այս գրառումը</DialogTitle>
          <DialogDescription>
            «{remove?.label}» գրառումը կհեռացվի այս ցուցադրական այցի տվյալներից։
          </DialogDescription>
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={() => setRemove(null)}>
              Չեղարկել
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                remove?.action();
                setRemove(null);
              }}
            >
              <Trash2 />
              Ջնջել
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={!!preview}
        onOpenChange={(o) => {
          if (!o) setPreview(null);
        }}
      >
        <DialogContent className="max-w-3xl">
          <DialogTitle>{preview?.title}</DialogTitle>
          <DialogDescription>Նախադիտում՝ նախքան հրապարակելը</DialogDescription>
          <VideoPlayer url={preview?.url || ""} />
        </DialogContent>
      </Dialog>
      <Dialog
        open={!!selectedStudent}
        onOpenChange={(o) => {
          if (!o) setSelectedStudent(null);
        }}
      >
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-auto">
          <DialogTitle>Աշակերտի արդյունքները</DialogTitle>
          <DialogDescription>Ցուցադրական գրառումներ և այս այցի պատասխաններ</DialogDescription>
          {(() => {
            const student = sampleStudents.find((s) => s.id === selectedStudent);
            const submission = submissions.find((s) => s.id === selectedStudent);
            if (student)
              return (
                <>
                  <h2>
                    {student.name} {student.surname}
                  </h2>
                  <p>Դասարան՝ {student.className}</p>
                  <p>Ավարտած պատմություններ՝ {student.completed}</p>
                  <p>Միջին գնահատական՝ {student.score}%</p>
                  <p className="demo-note">
                    Սա հորինված ցուցադրական գրառում է։ Անհատական պատասխաններ չկան։
                  </p>
                </>
              );
            if (submission)
              return (
                <>
                  <h2>{submission.name}</h2>
                  <p>
                    {stories.find((s) => s.id === submission.storyId)?.title} · {submission.earned}{" "}
                    / {submission.total}
                  </p>
                  {questions
                    .filter((q) => q.storyId === submission.storyId)
                    .map((q) => (
                      <div className="submission-answer" key={q.id}>
                        <strong>{q.title}</strong>
                        <p>{submission.answers[q.id]?.split("|").join(" → ") || "Պատասխան չկա"}</p>
                        {q.kind === "written" ? (
                          <label className="form-label">
                            Ուսուցչի մեկնաբանություն
                            <Textarea placeholder="Գրեք հետադարձ կապ…" />
                          </label>
                        ) : (
                          <span
                            className={
                              submission.answers[q.id] === q.correct
                                ? "text-primary"
                                : "text-destructive"
                            }
                          >
                            {submission.answers[q.id] === q.correct
                              ? "Ճիշտ պատասխան"
                              : "Սխալ պատասխան · ճիշտը՝ " + q.correct.split("|").join(" → ")}
                          </span>
                        )}
                      </div>
                    ))}
                  <Button
                    onClick={() => {
                      setNotice(
                        "Պատասխանները դիտված են։ Ուսուցչի մեկնաբանությունները չեն ուղարկվում կամ պահպանվում։",
                      );
                      setSelectedStudent(null);
                    }}
                  >
                    <Check />
                    Ավարտել դիտումը
                  </Button>
                </>
              );
            return null;
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
}
function upsert<T extends { id: string }>(items: T[], item: T) {
  return items.some((i) => i.id === item.id)
    ? items.map((i) => (i.id === item.id ? item : i))
    : [...items, item];
}
function reorder<T extends { id: string }>(items: T[], id: string, delta: number) {
  const i = items.findIndex((x) => x.id === id);
  const target = i + delta;
  if (i < 0 || target < 0 || target >= items.length) return items;
  const current = items[i];
  const other = items[target];
  if (!current || !other) return items;
  const next = [...items];
  next[i] = other;
  next[target] = current;
  return next;
}
function AdminTable({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {!rows.length && <p className="p-8 text-center text-muted-foreground">Գրառումներ չկան։</p>}
    </div>
  );
}
function Actions({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="flex">
      <Button size="icon" variant="ghost" onClick={onEdit} aria-label="Խմբագրել" title="Խմբագրել">
        <Pencil />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={onDelete}
        aria-label="Ջնջել"
        title="Ջնջել"
        className="text-destructive"
      >
        <Trash2 />
      </Button>
    </div>
  );
}
function Reorder({
  onUp,
  onDown,
  first,
  last,
}: {
  onUp: () => void;
  onDown: () => void;
  first: boolean;
  last: boolean;
}) {
  return (
    <div className="flex">
      <Button
        size="icon"
        variant="ghost"
        disabled={first}
        onClick={onUp}
        aria-label="Տեղափոխել վերև"
      >
        <ArrowUp />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        disabled={last}
        onClick={onDown}
        aria-label="Տեղափոխել ներքև"
      >
        <ArrowDown />
      </Button>
    </div>
  );
}
function SearchBox({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="search-field admin-search">
      <Search size={18} />
      <Input
        aria-label="Փնտրել գրառում"
        placeholder="Փնտրել…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
function EditModal({
  edit,
  onSave,
  onClose,
}: {
  edit: Edit;
  onSave: (e: Edit) => void;
  onClose: () => void;
}) {
  const { stories, categories } = useReading();
  const [draft, setDraft] = useState(edit);
  const [options, setOptions] = useState(
    edit.type === "question" ? edit.item.options.join("\n") : "",
  );
  const [content, setContent] = useState(
    edit.type === "story" ? edit.item.content.join("\n\n") : "",
  );
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(false);
  const update = (key: string, value: unknown) =>
    setDraft((old) => ({ ...old, item: { ...old.item, [key]: value } }) as Edit);
  const upload = (file: File | undefined, key: string) => {
    if (!file) return;
    const allowed =
      key === "image"
        ? file.type.startsWith("image/")
        : ["video/mp4", "video/webm", "video/ogg"].includes(file.type);
    if (!allowed) {
      setError("Ընտրեք համապատասխան պատկեր կամ MP4 / WebM տեսանյութ։");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setError("Ընտրեք մինչև 20 ՄԲ ֆայլ։");
      return;
    }
    setError("");
    update(key, URL.createObjectURL(file));
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (draft.type === "question") {
      const choices = options
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
      if (!draft.item.title.trim()) {
        setError("Գրեք հարցը։");
        return;
      }
      if (draft.item.kind !== "written" && choices.length < 2) {
        setError("Ավելացրեք առնվազն երկու տարբերակ։");
        return;
      }
      if (
        ["choice", "boolean", "image"].includes(draft.item.kind) &&
        !choices.includes(draft.item.correct)
      ) {
        setError("Ընտրեք ճիշտ պատասխան տարբերակների ցանկից։");
        return;
      }
      onSave({
        ...draft,
        item: {
          ...draft.item,
          options: choices,
          correct:
            draft.item.kind === "order"
              ? choices.join("|")
              : draft.item.kind === "written"
                ? ""
                : draft.item.correct,
        },
      });
      return;
    }
    if (draft.type === "video" && draft.item.url && !videoSource(draft.item.url)) {
      setError(
        "Այս տեսանյութի հղումը չի աջակցվում։ Օգտագործեք YouTube կամ HTTPS MP4 / WebM հղում։",
      );
      return;
    }
    if (draft.type === "story") {
      if (!content.trim()) {
        setError("Ավելացրեք պատմության տեքստը։");
        return;
      }
      onSave({
        ...draft,
        item: { ...draft.item, content: content.split(/\n\s*\n/).filter(Boolean) },
      });
      return;
    }
    onSave(draft);
  };
  return (
    <Dialog
      open
      onOpenChange={(o) => {
        if (!o) onClose();
      }}
    >
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto">
        <DialogTitle>
          {draft.type === "question"
            ? "Հարցի խմբագրում"
            : draft.type === "story"
              ? "Պատմության խմբագրում"
              : draft.type === "category"
                ? "Բաժնի խմբագրում"
                : "Մուլտֆիլմի խմբագրում"}
        </DialogTitle>
        <DialogDescription>Փոփոխությունները չեն ուղարկվում իրական ծառայության։</DialogDescription>
        <form onSubmit={submit} className="space-y-4">
          <label className="form-label">
            {draft.type === "question" ? "Հարցը" : "Վերնագիրը"}
            <Input
              required
              value={draft.item.title}
              onChange={(e) => update("title", e.target.value)}
            />
          </label>
          {draft.type === "story" && (
            <>
              <label className="form-label">
                Հեղինակ
                <Input
                  required
                  value={draft.item.author}
                  onChange={(e) => update("author", e.target.value)}
                />
              </label>
              <label className="form-label">
                Բաժին
                <select
                  value={draft.item.category}
                  onChange={(e) => update("category", e.target.value)}
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </label>
              <label className="form-label">
                Նկարագրություն
                <Textarea
                  required
                  value={draft.item.description}
                  onChange={(e) => update("description", e.target.value)}
                />
              </label>
              <label className="form-label">
                Պատմության տեքստը (պարբերությունները՝ դատարկ տողով)
                <Textarea
                  required
                  rows={8}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </label>
              <label className="form-label">
                Ընթերցելու րոպեներ
                <Input
                  type="number"
                  min={1}
                  max={120}
                  value={draft.item.minutes}
                  onChange={(e) => update("minutes", Number(e.target.value))}
                />
              </label>
            </>
          )}
          {draft.type === "question" && (
            <>
              <div className="form-grid">
                <label className="form-label">
                  Հարցի տեսակը
                  <select
                    value={draft.item.kind}
                    onChange={(e) => {
                      const kind = e.target.value as QuestionKind;
                      update("kind", kind);
                      if (kind === "boolean") {
                        setOptions("Ճիշտ է\nՍխալ է");
                        update("correct", "Ճիշտ է");
                      }
                    }}
                  >
                    {Object.entries(kindLabels).map(([k, l]) => (
                      <option key={k} value={k}>
                        {l}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="form-label">
                  Պատմություն
                  <select
                    value={draft.item.storyId}
                    onChange={(e) => update("storyId", e.target.value)}
                  >
                    {stories.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              {draft.item.kind !== "written" && (
                <label className="form-label">
                  {draft.item.kind === "order"
                    ? "Դեպքերը ճիշտ հերթականությամբ (յուրաքանչյուրը՝ նոր տողով)"
                    : "Պատասխանի տարբերակները (յուրաքանչյուրը՝ նոր տողով)"}
                  <Textarea required value={options} onChange={(e) => setOptions(e.target.value)} />
                </label>
              )}
              {["choice", "image", "boolean"].includes(draft.item.kind) && (
                <label className="form-label">
                  Ճիշտ պատասխանը
                  <select
                    required
                    value={draft.item.correct}
                    onChange={(e) => update("correct", e.target.value)}
                  >
                    <option value="">Ընտրել</option>
                    {options
                      .split("\n")
                      .filter(Boolean)
                      .map((o, i) => (
                        <option key={i}>{o}</option>
                      ))}
                  </select>
                </label>
              )}
              <label className="form-label">
                Միավոր
                <Input
                  type="number"
                  min={1}
                  max={100}
                  value={draft.item.points}
                  onChange={(e) => update("points", Number(e.target.value))}
                />
              </label>
              {draft.item.kind === "image" && (
                <label className="form-label">
                  Հարցի պատկերը
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => upload(e.target.files?.[0], "image")}
                  />
                </label>
              )}
            </>
          )}
          {draft.type === "category" && (
            <>
              <label className="form-label">
                Նկարագրություն
                <Textarea
                  required
                  value={draft.item.description}
                  onChange={(e) => update("description", e.target.value)}
                />
              </label>
              <label className="form-label">
                Գունային ձևավորում
                <select value={draft.item.tone} onChange={(e) => update("tone", e.target.value)}>
                  {[
                    ["mint", "Անանուխի կանաչ"],
                    ["lavender", "Նուրբ մանուշակագույն"],
                    ["peach", "Դեղձի երանգ"],
                    ["sky", "Երկնագույն"],
                    ["rose", "Վարդագույն"],
                    ["yellow", "Արևային դեղին"],
                  ].map(([v, l]) => (
                    <option key={v} value={v}>
                      {l}
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}
          {draft.type === "video" && (
            <>
              <label className="form-label">
                Նկարագրություն
                <Textarea
                  value={draft.item.description}
                  onChange={(e) => update("description", e.target.value)}
                />
              </label>
              <label className="form-label">
                Բաժին
                <select
                  value={draft.item.category}
                  onChange={(e) => update("category", e.target.value)}
                >
                  {["Հեքիաթներ", "Ուսուցողական", "Հայկական պատմություններ", "Առակներ"].map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label className="form-label">
                YouTube կամ տեսանյութի հղում
                <Input
                  value={draft.item.url.startsWith("blob:") ? "Տեղային ֆայլ" : draft.item.url}
                  onChange={(e) => update("url", e.target.value)}
                  placeholder="https://…"
                />
              </label>
              <label className="form-label">
                <span className="flex items-center gap-2">
                  <Upload size={16} />
                  Կամ վերբեռնել տեսանյութ (մինչև 20 ՄԲ)
                </span>
                <Input
                  type="file"
                  accept="video/mp4,video/webm,video/ogg"
                  onChange={(e) => upload(e.target.files?.[0], "url")}
                />
              </label>
              <Button variant="outline" type="button" onClick={() => setPreview(!preview)}>
                <Eye />
                Նախադիտել
              </Button>
              {preview && <VideoPlayer url={draft.item.url} />}
            </>
          )}
          {["story", "video"].includes(draft.type) && (
            <>
              <label className="form-label">
                Շապիկի պատկեր
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => upload(e.target.files?.[0], "image")}
                />
              </label>
              {"image" in draft.item && (
                <img className="upload-preview" src={draft.item.image} alt="Շապիկի նախադիտում" />
              )}
              <label className="form-label">
                Հրապարակման վիճակ
                <select
                  value={"status" in draft.item ? draft.item.status : ""}
                  onChange={(e) => update("status", e.target.value)}
                >
                  <option>Նախագիծ</option>
                  <option>Հրապարակված</option>
                </select>
              </label>
            </>
          )}
          {error && (
            <p role="alert" className="text-destructive">
              {error}
            </p>
          )}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Չեղարկել
            </Button>
            <Button>
              <Check />
              Պահպանել
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
function SettingsForm({ onSaved }: { onSaved: () => void }) {
  const { homeTitle, setHomeTitle, homeSubtitle, setHomeSubtitle, stories, featured, setFeatured } =
    useReading();
  const [title, setTitle] = useState(homeTitle);
  const [subtitle, setSubtitle] = useState(homeSubtitle);
  const [chosen, setChosen] = useState(featured);
  return (
    <form
      className="settings-form"
      onSubmit={(e) => {
        e.preventDefault();
        setHomeTitle(title);
        setHomeSubtitle(subtitle);
        setFeatured(chosen);
        onSaved();
      }}
    >
      <h2>Գլխավոր էջ</h2>
      <label className="form-label">
        Գլխավոր վերնագիր
        <Input required value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label className="form-label">
        Ներածական տեքստ
        <Textarea required value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
      </label>
      <h3>Ընտրված պատմություններ</h3>
      <div className="space-y-3">
        {stories.map((s) => (
          <label className="flex items-center gap-3 cursor-pointer" key={s.id}>
            <input
              type="checkbox"
              checked={chosen.includes(s.id)}
              onChange={(e) =>
                setChosen((old) =>
                  e.target.checked ? [...old, s.id] : old.filter((id) => id !== s.id),
                )
              }
            />
            {s.title}
          </label>
        ))}
      </div>
      <p className="text-muted-foreground">
        Գլխավոր էջում ցուցադրվում են առաջին երեք հրապարակված ընտրված պատմությունները։ Բաժինների
        հերթն ու գույները փոխվում են «Բաժիններ» էջում։
      </p>
      <Button>
        <Check />
        Կիրառել փոփոխությունները
      </Button>
    </form>
  );
}
