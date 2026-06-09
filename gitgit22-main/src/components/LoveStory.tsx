import { useState } from 'react';
import { SectionTitle, GoldDivider } from './Shared';
import { Play, Film } from 'lucide-react';

const EPISODES = [
  {
    num: 1,
    title: 'Keeletat 1 ken',
    emoji: '✨',
    story: `Henokna Tsion mibalu ljoch neberu eshi atlegnm kezanlh huletum zmtegnana sew maykerbu nachew beteley yesun kostaranetma ateykegn endet endehone baytawekm tegbabtew arefut eskahun yetedereesebet neger baynorm guadegnamoch honu bemigerm huneta wendme ehite eyalum yashkabtu neber alu were aydebekm beyekenu mawratachewn ketelu mistregna guadegnam honu neger gn keeletat and ken yihe mashkabetachew liketl alchalem wede fkr tekeyere gud eko nw endi eyalu nw yeszendro ljoch gud yeserun enalh ljitua beseatu fkr endemayzat 100% ergtegn hona nw mttemamenew mnm mamen atfelgm ena yehone seat tnsh teraraku alu ay gize keza ech ebd yehonech hulum kerefede nw migebat endalfokerech beman bso bigegn tru meseleh ayii betena telekefech alkuh kebad nw ljum endihu yewazza aydelem bezmta mektat yakbetal afrso serat lbelh bergt ayferedbatm lesua sewn mamen endeterara yegezefebat seat nebr ayigermm hulum sew and endalhone asayat mn ayinet sew bihon nw yasblal des bemil huneta  guadegnnetachew alzelekem keeletat and ken mata ............`,
  },
  {
    num: 2,
    title: 'How It All Started',
    emoji: '💬',
    story: `yihe hulu yetejemerew beand text neber .........
PART 2 KETAY AMET`,
  },
  {
    num: 3,
    title: 'Birthday Memory',
    emoji: '🎂',
    story: `ldeth ken lemejemerya gize yegna sefer chika adaltogn yesakhbgnn mechem alresahulhm  `,
  },
  {
    num: 4,
    title: 'Our Special Day',
    emoji: '22🌙',
    story: `betam special mlew ken yeberedow ken nw  yetegenagnenbet amet blen sngenagn ahun yihen mn yilutal gn mnalbatm fkr yeyazegn yan ken hula yimeslegnal steretr.... asbbet endegmewalen ..........`,
  },
  {
    num: 5,
    title: 'Forever Grateful',
    emoji: '❤️',
    story: `Henoke andande eko kal fkrn awtto meglets ayichlm lene endi neh bye lemeglets siyaktegn aleme elhalew yemrm aleme hywete neh bene edme lk nurlgn rejim edme ketenaga endiseth tselote nw melkam lidet bale ewedhalew ❤️`,
  },
];

export default function LoveStory() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="section-wrapper" style={{ background: 'linear-gradient(180deg, var(--dark) 0%, var(--navy) 100%)' }}>
      <div className="relative z-10 w-full max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <p className="font-mono text-xs tracking-widest mb-2" style={{ color: 'rgba(201,168,76,.4)', letterSpacing: '.35em' }}>
            MOON ORIGINALS
          </p>
          <SectionTitle>Mebaye &amp; Chereka 🌙</SectionTitle>
          <p className="font-serif italic text-xl mt-1" style={{ color: 'rgba(201,168,76,.55)' }}>
            The Moon Series
          </p>
          <GoldDivider />
          <div className="flex items-center justify-center gap-4 text-xs mt-2" style={{ color: 'rgba(201,168,76,.4)' }}>
            <span>5 Episodes</span><span>·</span><span>2026</span><span>·</span>
            <span className="text-green-400">Now Streaming</span>
          </div>
        </div>

        <div className="space-y-3">
          {EPISODES.map((ep, i) => (
            <div
              key={ep.num}
              className="gold-card overflow-hidden cursor-pointer"
              style={{ animation: `fadeUp .7s ${i * .1}s both` }}
              onClick={() => setActive(active === ep.num ? null : ep.num)}
            >
              <div className="flex items-center gap-4 p-4 sm:p-5">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full"
                  style={{ background: 'rgba(201,168,76,.1)', border: '1px solid rgba(201,168,76,.3)' }}>
                  <span className="font-mono text-sm" style={{ color: 'var(--gold)' }}>E{ep.num}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-xs mb-1" style={{ color: 'var(--gold-dim)', letterSpacing: '.15em' }}>EPISODE {ep.num}</p>
                  <p className="font-serif text-lg" style={{ color: 'var(--gold-light)' }}>{ep.emoji} {ep.title}</p>
                </div>
                <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full transition-all"
                  style={{
                    background: active === ep.num ? 'rgba(201,168,76,.3)' : 'rgba(201,168,76,.08)',
                    border: '1px solid rgba(201,168,76,.4)',
                  }}>
                  <Play size={14} style={{ color: 'var(--gold)', marginLeft: 2 }} />
                </div>
              </div>

              {active === ep.num && (
                <div className="px-5 pb-5 pt-0"
                  style={{ animation: 'slideDown .35s ease both', borderTop: '1px solid rgba(201,168,76,.12)' }}>
                  <p className="font-serif italic text-sm pt-4 whitespace-pre-line"
                    style={{ color: 'rgba(232,220,190,.7)', lineHeight: 1.9 }}>
                    {ep.story}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
