import { useState } from 'react';
import { SectionTitle, GoldDivider } from './Shared';
import { Play, Edit2, Save } from 'lucide-react';

const INITIAL_EPISODES = [
  {
    num: 1,
    title: 'Keeletat 1 ken',
    emoji: '✨',
    story: `keeletat and ken eshi atlegnm🤔 meches keeletat hulet ken ayhon meches🤭 keeletat andua ken anten yagegnehubat nat fetari mn yahl biwedegn nw e😌 mn bye tselye nw anten yagegnehuh🥹 yeldeth ken alem anten yemesele asteway sew yagegnechbet ene demo alemen yagegnehubet ken nw 🥰 yene hulu neger aleme hywete slalehegn yene slehonk edlegna negn😊 Heneri lbe lay yalehn gzat btayew 🙄 .....kalshetkut neber mtlew😁.......`,
  },
  {
    num: 2,
    title: 'How It All Started',
    emoji: '💬',
    story: `fkr tarikachnn ltsf neber eko gn kenun adebelalke yikr atlegnm bye enji rechew aydelem demo😌 gn beka negreh malakewn and mistir lngerh 👂........
lewerema endi atguagua🙉 PART 2 KETAY AMET😁`,
  },
  {
    num: 3,
    title: 'Birthday Memory',
    emoji: '🎂',
    story: `ldeth ken lemejemerya gize yegna sefer chika adaltogn yesakhbgnn mechem aresalhm😠`,
  },
  {
    num: 4,
    title: 'Our Special Day',
    emoji: '22🌙',
    story: `betam special mlew yeberedow ken tz yilhal yetegenagnenbet amet blen sngenagn etu gud saysema alu🙉 ahun yihen mn yilutal🤭 gn asbbet endegmewalen ..........`,
  },
  {
    num: 5,
    title: 'Forever Grateful',
    emoji: '❤️',
    story: `Henoke andande kal fkrn awtto meglets ayichlm lene endi neh bye lemeglets siyaktegn aleme elhalew yemrm aleme hywete neh bene edme lk nurlgn rejim edme ketenaga endiseth tselote nw enkuan teweledklgn melkam lidet bale ewedhalew❤️`,
  },
];

export default function LoveStory() {
  const [active, setActive] = useState<number | null>(null);
  const [editing, setEditing] = useState<number | null>(null);
  const [episodes, setEpisodes] = useState(INITIAL_EPISODES);

  const updateStory = (num: number, value: string) => {
    setEpisodes(
      episodes.map((ep) =>
        ep.num === num ? { ...ep, story: value } : ep
      )
    );
  };

  return (
    <section
      className="section-wrapper"
      style={{
        background:
          'linear-gradient(180deg, var(--dark) 0%, var(--navy) 100%)',
      }}
    >
      <div className="relative z-10 w-full max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p
            className="font-mono text-xs tracking-widest mb-2"
            style={{
              color: 'rgba(201,168,76,.4)',
              letterSpacing: '.35em',
            }}
          >
            MOON ORIGINALS
          </p>

          <SectionTitle>Mebaye & Chereka 🌙</SectionTitle>

          <p
            className="font-serif italic text-xl mt-1"
            style={{ color: 'rgba(201,168,76,.55)' }}
          >
            The Moon Series
          </p>

          <GoldDivider />
        </div>

        <div className="space-y-3">
          {episodes.map((ep, i) => (
            <div
              key={ep.num}
              className="gold-card overflow-hidden"
              style={{ animation: `fadeUp .7s ${i * 0.1}s both` }}
            >
              <div
                className="flex items-center gap-4 p-4 sm:p-5 cursor-pointer"
                onClick={() =>
                  setActive(active === ep.num ? null : ep.num)
                }
              >
                <div
                  className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full"
                  style={{
                    background: 'rgba(201,168,76,.1)',
                    border: '1px solid rgba(201,168,76,.3)',
                  }}
                >
                  <span
                    className="font-mono text-sm"
                    style={{ color: 'var(--gold)' }}
                  >
                    E{ep.num}
                  </span>
                </div>

                <div className="flex-1">
                  <p
                    className="font-mono text-xs mb-1"
                    style={{
                      color: 'var(--gold-dim)',
                      letterSpacing: '.15em',
                    }}
                  >
                    EPISODE {ep.num}
                  </p>

                  <p
                    className="font-serif text-lg"
                    style={{ color: 'var(--gold-light)' }}
                  >
                    {ep.emoji} {ep.title}
                  </p>
                </div>

                <Play
                  size={16}
                  style={{ color: 'var(--gold)' }}
                />
              </div>

              {active === ep.num && (
                <div
                  className="px-5 pb-5"
                  style={{
                    borderTop: '1px solid rgba(201,168,76,.12)',
                  }}
                >
                  {editing === ep.num ? (
                    <>
                      <textarea
                        value={ep.story}
                        onChange={(e) =>
                          updateStory(ep.num, e.target.value)
                        }
                        className="w-full mt-4 p-3 rounded-lg bg-black/20"
                        rows={8}
                      />

                      <button
                        onClick={() => setEditing(null)}
                        className="mt-3 px-4 py-2 rounded-lg"
                        style={{
                          background: 'rgba(201,168,76,.2)',
                        }}
                      >
                        <Save size={16} className="inline mr-2" />
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <p
                        className="font-serif italic text-sm pt-4 whitespace-pre-line"
                        style={{
                          color: 'rgba(232,220,190,.7)',
                          lineHeight: 1.9,
                        }}
                      >
                        {ep.story}
                      </p>

                      <button
                        onClick={() => setEditing(ep.num)}
                        className="mt-3 px-4 py-2 rounded-lg"
                        style={{
                          background: 'rgba(201,168,76,.2)',
                        }}
                      >
                        <Edit2 size={10} className="inline mr-2" />
                        Edit Story
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
