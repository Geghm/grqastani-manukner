import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { BookOpen, Trophy, Star, Medal, ArrowRight, Check, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useReading } from "./store";
import { PageHeading, ProgressBar, DemoNote } from "./shared";
export function StudentPage() {
  const { student, setStudent, completed, submissions, stories } = useReading();
  const [editing, setEditing] = useState(!student.name);
  const [draft, setDraft] = useState(student);
  const own = submissions.filter(
    (s) => s.name === (student.name ? `${student.name} ${student.surname}` : "Հյուր ընթերցող"),
  );
  const sum = own.reduce((a, s) => ({ earned: a.earned + s.earned, total: a.total + s.total }), {
    earned: 0,
    total: 0,
  });
  return (
    <div className="container-width page-content">
      <PageHeading
        eyebrow="Քո փոքրիկ մեծ հաջողությունները"
        title={student.name ? `Ողջո՛ւյն, ${student.name}` : "Իմ ընթերցասեր անկյունը"}
        description="Ամեն նոր պատմություն նոր ձեռքբերում է։"
      >
        <Button variant="outline" onClick={() => setEditing(!editing)}>
          <UserRound />
          {student.name ? "Փոխել տվյալները" : "Ներկայանալ"}
        </Button>
      </PageHeading>
      <DemoNote />
      {editing && (
        <form
          className="student-form"
          onSubmit={(e) => {
            e.preventDefault();
            setStudent(draft);
            setEditing(false);
          }}
        >
          <h2>Եկ ծանոթանանք</h2>
          <div className="form-grid">
            <label className="form-label">
              Անուն
              <Input
                required
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              />
            </label>
            <label className="form-label">
              Ազգանուն
              <Input
                required
                value={draft.surname}
                onChange={(e) => setDraft({ ...draft, surname: e.target.value })}
              />
            </label>
            <label className="form-label">
              Դասարան
              <select
                value={draft.className}
                onChange={(e) => setDraft({ ...draft, className: e.target.value })}
              >
                {["3Ա", "3Բ", "3Գ", "4Ա", "4Բ", "4Գ"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
          </div>
          <p className="text-muted-foreground text-sm mb-4">
            Սա անունով ներկայացում է, ոչ թե անհատական հաշիվ։ Տվյալները չեն պահպանվում այցի ավարտից
            հետո։
          </p>
          <Button>
            <Check />
            Պատրաստ է
          </Button>
        </form>
      )}
      <div className="stats-grid">
        <div className="stat-item tone-mint">
          <BookOpen />
          <strong>{completed.length}</strong>
          <span>Կարդացած պատմություն</span>
        </div>
        <div className="stat-item tone-lavender">
          <Check />
          <strong>{own.length}</strong>
          <span>Ավարտած հարցաշար</span>
        </div>
        <div className="stat-item tone-peach">
          <Trophy />
          <strong>{sum.total ? Math.round((sum.earned / sum.total) * 100) : 0}%</strong>
          <span>Ինքնաշխատ գնահատական</span>
        </div>
      </div>
      <section className="student-progress">
        <h2>Իմ ընթերցանության ճանապարհը</h2>
        <p>
          {completed.length
            ? "Ապրե՛ս։ Շարունակիր բացահայտել Գրքաստանը։"
            : "Քո առաջին պատմությունն արդեն սպասում է։"}
        </p>
        <ProgressBar value={(completed.length / 6) * 100} />
        <div className="flex justify-between text-sm mt-3">
          <span>{completed.length} / 6 պատմություն</span>
          <Link to="/library" className="text-primary">
            Ընտրել պատմություն →
          </Link>
        </div>
      </section>
      <section className="home-section">
        <h2 className="mb-6">Իմ նվաճումները</h2>
        <div className="achievement-grid">
          {[
            { title: "Առաջին էջը", icon: BookOpen, earned: completed.length >= 1 },
            { title: "Հետաքրքրասեր միտք", icon: Star, earned: own.length >= 1 },
            { title: "Գրքերի բարեկամ", icon: Medal, earned: completed.length >= 3 },
          ].map((a) => (
            <div key={a.title} className={a.earned ? "achievement earned" : "achievement"}>
              <a.icon size={36} />
              <h3>{a.title}</h3>
              <span>{a.earned ? "Վաստակած է" : "Դեռ առջևում է"}</span>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h2 className="mb-5">Իմ վերջին առաջադրանքները</h2>
        {own.length ? (
          <div className="activity-list">
            {own.map((s) => (
              <div key={s.id}>
                <span>
                  <BookOpen size={19} />
                  {stories.find((st) => st.id === s.storyId)?.title}
                </span>
                <strong>
                  {s.earned} / {s.total}
                </strong>
                <Link to="/quiz/$id" params={{ id: s.storyId }}>
                  Կրկնել →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <BookOpen />
            <p>Սկսիր քո առաջին պատմությունից։</p>
            <Button asChild>
              <Link to="/library">
                Գնանք գրադարան
                <ArrowRight />
              </Link>
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
