"use client";

export default function EasterEggPage() {
  return (
    <>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          cursor:
            url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><circle cx="10" cy="10" r="8" fill="lime"/></svg>'),
            auto;
        }

        body {
          background: repeating-linear-gradient(
            45deg,
            #ff00ff 0px,
            #00ffff 10px,
            #ffff00 20px,
            #ff0000 30px,
            #00ff00 40px,
            #0000ff 50px
          );
          font-family: "Comic Sans MS", cursive, sans-serif;
          animation: rotate 5s infinite linear;
          overflow-x: hidden;
        }

        @keyframes rotate {
          0% {
            filter: hue-rotate(0deg);
          }
          100% {
            filter: hue-rotate(360deg);
          }
        }

        @keyframes blink {
          0%,
          50%,
          100% {
            opacity: 1;
          }
          25%,
          75% {
            opacity: 0;
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes wiggle {
          0%,
          100% {
            transform: translateX(0) rotate(0deg);
          }
          25% {
            transform: translateX(-10px) rotate(-5deg);
          }
          75% {
            transform: translateX(10px) rotate(5deg);
          }
        }

        .container {
          max-width: 95%;
          margin: 0 auto;
          padding: 10px;
        }

        header {
          background: linear-gradient(135deg, #ff1493, #00ff00, #ff8c00, #4b0082);
          border: 15px ridge gold;
          padding: 30px;
          text-align: center;
          box-shadow:
            0 0 50px 20px rgba(255, 0, 255, 0.8),
            0 0 100px 40px rgba(0, 255, 255, 0.6);
          animation: wiggle 2s infinite;
        }

        h1 {
          font-size: 72px;
          color: #ff0000;
          text-shadow:
            5px 5px 0 #00ff00,
            10px 10px 0 #0000ff,
            15px 15px 0 #ffff00,
            20px 20px 0 #ff00ff;
          animation: blink 0.5s infinite;
          font-weight: 900;
          letter-spacing: 8px;
          transform: rotate(-3deg);
        }

        .subtitle {
          font-size: 48px;
          color: #00ffff;
          text-decoration: underline wavy #ff00ff;
          animation: spin 3s infinite linear;
          display: inline-block;
          margin: 20px 0;
          background: repeating-linear-gradient(90deg, #ff0000, #ffff00 10px, #00ff00 20px);
          padding: 15px;
          border: 8px dotted #0000ff;
        }

        nav {
          background: radial-gradient(circle, #ff0080, #80ff00, #0080ff);
          padding: 25px;
          text-align: center;
          border: 12px groove #ffff00;
          margin: 20px 0;
        }

        nav a {
          display: inline-block;
          color: #ffff00;
          background: linear-gradient(45deg, #ff0000, #00ff00, #0000ff);
          padding: 20px 30px;
          margin: 10px;
          text-decoration: none;
          font-size: 32px;
          font-weight: bold;
          border: 6px outset #ff00ff;
          text-shadow:
            3px 3px 0 #000,
            -3px -3px 0 #fff;
          animation: wiggle 1s infinite;
          transform: skew(-5deg);
        }

        nav a:hover {
          animation: spin 0.5s infinite;
          transform: scale(1.5) rotate(15deg);
        }

        .section {
          background: repeating-conic-gradient(
            from 45deg,
            #ff0000 0deg,
            #ffff00 30deg,
            #00ff00 60deg,
            #00ffff 90deg,
            #0000ff 120deg,
            #ff00ff 150deg
          );
          border: 20px double #000;
          padding: 40px;
          margin: 30px 0;
          box-shadow:
            15px 15px 0 #ff00ff,
            30px 30px 0 #00ff00,
            45px 45px 0 #ffff00;
          transform: rotate(2deg);
        }

        .section:nth-child(even) {
          transform: rotate(-2deg);
        }

        h2 {
          font-size: 64px;
          color: #00ff00;
          text-decoration: underline overline;
          text-shadow:
            4px 4px 0 #ff0000,
            8px 8px 0 #0000ff;
          animation: blink 1s infinite;
          background: linear-gradient(90deg, #ff00ff, #ffff00);
          padding: 25px;
          border: 10px ridge #00ffff;
          margin-bottom: 30px;
          transform: skew(-8deg);
        }

        p,
        li {
          font-size: 28px;
          line-height: 1.3;
          color: #ffff00;
          text-shadow:
            3px 3px 0 #ff0000,
            -2px -2px 0 #00ff00,
            4px -4px 0 #0000ff;
          background: rgba(255, 0, 255, 0.5);
          padding: 15px;
          border: 5px dashed #00ffff;
          margin: 15px 0;
          font-weight: bold;
        }

        ul {
          list-style-type: none;
        }

        li::before {
          content: "💀 🎸 👻 ";
          font-size: 36px;
          animation: spin 2s infinite;
          display: inline-block;
        }

        .marquee {
          background: #000;
          color: #ff0000;
          font-size: 48px;
          padding: 30px;
          border: 8px solid #00ff00;
          font-weight: bold;
          animation: blink 0.3s infinite;
          overflow: hidden;
          white-space: nowrap;
        }

        .marquee-text {
          display: inline-block;
          animation: marquee 10s linear infinite;
        }

        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .image-container {
          text-align: center;
          margin: 30px 0;
          animation: wiggle 3s infinite;
        }

        .image-container img {
          border: 15px groove #ff00ff;
          box-shadow: 0 0 50px #00ff00;
          animation: spin 10s infinite linear;
          max-width: 400px;
          filter: hue-rotate(180deg) saturate(3);
        }

        footer {
          background: repeating-linear-gradient(
            0deg,
            #ff0000,
            #ffff00 5px,
            #00ff00 10px,
            #00ffff 15px,
            #0000ff 20px,
            #ff00ff 25px
          );
          padding: 50px;
          text-align: center;
          border: 25px inset #ffff00;
          margin-top: 40px;
        }

        footer p {
          font-size: 36px;
          background: none;
          border: none;
        }

        .flash {
          animation: blink 0.2s infinite;
        }

        .counter {
          background: #000;
          color: #00ff00;
          font-family: "Courier New", monospace;
          font-size: 40px;
          padding: 20px;
          border: 8px solid #ff00ff;
          display: inline-block;
          margin: 20px;
          animation: blink 1s infinite;
        }

        .button {
          background: linear-gradient(45deg, #ff0000, #ff00ff, #0000ff);
          color: #ffff00;
          font-size: 36px;
          padding: 25px 50px;
          border: 8px outset #00ff00;
          font-weight: bold;
          text-shadow: 3px 3px 0 #000;
          animation: wiggle 0.5s infinite;
          margin: 15px;
          display: inline-block;
        }
      `}</style>

      <div className="container">
        <div className="marquee">
          <div className="marquee-text">
            ⚠️ WARNING: YOU ARE ENTERING THE OFFICIAL WEBSITE OF THE VERY BAD DAYS ⚠️ BEST VIEWED IN
            NETSCAPE NAVIGATOR ⚠️ TURN YOUR VOLUME UP TO 11 ⚠️
          </div>
        </div>

        <header>
          <h1>✨🎃 THE VERY BAD DAYS 🎃✨</h1>
          <div className="subtitle">OFFICIAL SUPER AWESOME WEBSITE!!!</div>
          <div className="counter">VISITOR #: 999999</div>
          <div className="counter">YOU ARE VISITOR: 42069</div>
          <div className="counter">HITS TODAY: ∞</div>
        </header>

        <nav>
          <a href="#about">ABOUT US!!!</a>
          <a href="#music">MUSIC!!</a>
          <a href="#shows">SHOWS!!!</a>
          <a href="#contact">CONTACT!!!!</a>
          <a href="#merch">BUY STUFF!!!!</a>
        </nav>

        <div className="section" id="about">
          <h2>🎸 WHO WE ARE AND WHY YOU SHOULD CARE 🎸</h2>
          <p>
            Welcome to the OFFICIAL website of THE VERY BAD DAYS, the most INCREDIBLE, AMAZING,
            SPECTACULAR band from Minneapolis, Minnesota!!! We are a THREE-PIECE POWERHOUSE of
            MUSICAL EXCELLENCE that will BLOW YOUR MIND and MELT YOUR FACE with our UNIQUE BLEND of
            90s GRUNGE, PUNK ROCK, and SPOOKY VIBES!!!
          </p>

          <p>
            Our band consists of DANIEL GOODROAD on drums and vocals (he hits things REALLY HARD),
            ARIC BIEGANEK on guitar (he makes the guitar CRY and SCREAM), and BRIAN REED on bass
            (his basslines will SHAKE YOUR VERY SOUL and possibly cause MINOR EARTHQUAKES)!!!
          </p>

          <p>
            We started playing music together because we LOVE monsters, ghosts, cryptids, zombies,
            demons, vampires, werewolves, mummies, ghouls, skeletons, witches, warlocks, goblins,
            trolls, ogres, dragons, and also we write songs about BROKEN HEARTS and PHILOSOPHICAL
            CONTEMPLATIONS about THE MEANING OF EXISTENCE in this CRUEL and UNFORGIVING WORLD!!!
          </p>

          <p>
            Our band name comes from the FAMOUS CHILDREN&apos;S BOOK &quot;Alexander and the
            Terrible, Horrible, No Good, Very Bad Day&quot; which is VERY APPROPRIATE because every
            day IS terrible and horrible and no good and very bad, especially when you think about
            CLIMATE CHANGE, POLITICAL CORRUPTION, ECONOMIC INEQUALITY, SOCIAL INJUSTICE, and the
            fact that PIZZA ROLLS are never the right temperature (they&apos;re either FROZEN SOLID
            or LAVA HOT)!!!
          </p>

          <p>
            We have been described by critics as &quot;spooky punk music,&quot; &quot;90s alt
            rock,&quot; &quot;garage band goodness,&quot; &quot;Minneapolis doomsday prophets,&quot;
            and &quot;a childishly grim B-horror flick of a band&quot; which are ALL ACCURATE
            DESCRIPTIONS of our INCREDIBLE and GENRE-DEFYING SOUND!!!
          </p>
        </div>

        <div className="section" id="music">
          <h2>🎵 OUR LEGENDARY DISCOGRAPHY OF AUDIO EXCELLENCE 🎵</h2>

          <p>
            We have released MULTIPLE ALBUMS and EPs that you can listen to RIGHT NOW on Bandcamp,
            Spotify, Apple Music, YouTube, SoundCloud, Tidal, Amazon Music, Pandora, and probably
            some OTHER streaming services that we don&apos;t even know about!!!
          </p>

          <ul>
            <li>
              &quot;SCAPEGOATS&quot; (2019) - Our FIRST album featuring SIX INCREDIBLE TRACKS that
              will make you QUESTION EVERYTHING you thought you knew about music and also about LIFE
              ITSELF!!!
            </li>

            <li>
              &quot;YOU CALL THIS AN APOCALYPSE?&quot; (June 24, 2022) - An EPIC SIX-TRACK EP that
              explores the MANY WAYS our worlds end EVERY SINGLE DAY including broken hearts,
              long-lost loves, silly but heartfelt over-philosophizing, and the REAL-LIFE SUICIDE of
              a dolphin named Kathy (may she rest in peace)!!! This album was produced by Cloverleaf
              Audio-Visual with Matt Ebso as producer and recording engineer, Maximiliano Frini as
              assistant engineer, Jun Yang Ng as mix engineer, and Greg Reierson from Rareform
              Mastering as mastering engineer!!!
            </li>

            <li>
              &quot;THE TALE OF THE WOODMAN&quot; (October 20, 2022) - A TERRIFYING SINGLE about a
              summer camp counselor who SOLD HIS SOUL to win a sack race and then ALL THE CHILDREN
              DIED and now his EVIL SPIRIT haunts Lake Woodman FOREVER!!! Go, go Woodman, go!!! Run,
              run children, run!!! This is a CAUTIONARY TALE about the dangers of COMPETITIVE SUMMER
              CAMP ACTIVITIES!!!
            </li>
          </ul>

          <p>
            Some of our MOST POPULAR songs include &quot;Furthermore,&quot; &quot;When I Go Like
            This,&quot; &quot;Paint It Ugly,&quot; &quot;Uptown Town,&quot; &quot;Inundation,&quot;
            and &quot;Unhappy Kathy&quot; which are ALL AVAILABLE to stream RIGHT NOW on your
            FAVORITE music platform (or your LEAST favorite music platform, we don&apos;t judge)!!!
          </p>

          <p>
            Our music has been described as having &quot;unexpected sweetness,&quot; &quot;dark
            humor,&quot; &quot;90s nostalgia,&quot; &quot;garage band goodness,&quot; &quot;spooky
            yet playful,&quot; &quot;grungy originals,&quot; and &quot;punk existential
            Ghostbustery&quot; which is PROBABLY the best compliment ANY band has EVER RECEIVED in
            the ENTIRE HISTORY of MUSIC!!!
          </p>

          <div className="button">CLICK HERE TO LISTEN NOW!!!</div>
          <div className="button">DOWNLOAD ALL OUR MUSIC!!!</div>
          <div className="button">SHARE WITH YOUR FRIENDS!!!</div>
        </div>

        <div className="section" id="shows">
          <h2>🎤 UPCOMING LIVE PERFORMANCES WHERE YOU CAN SEE US IN PERSON 🎤</h2>

          <p>
            We play shows ALL OVER Minneapolis and the surrounding areas at MANY DIFFERENT VENUES
            including the Chatterbox, Acadia, the Caboose, 331 Club, Cloudland, Can Can Wonderland,
            and MANY OTHER places where people gather to experience LIVE MUSIC and also to DRINK
            BEVERAGES and SOCIALIZE with other HUMAN BEINGS!!!
          </p>

          <p>
            Our live shows are INCREDIBLY ENERGETIC and FUN and DIFFERENT every single time because
            we are a little LOOSE with our performances and we bring A LOT of fun and energy that
            audiences are VERY RECEPTIVE to!!! People have told us things like &quot;Man I really
            like this, I like that&quot; and &quot;I&apos;ve never felt super competitive or
            anything like that&quot; which we think are GREAT compliments!!!
          </p>

          <p>
            We especially love playing HALLOWEEN SHOWS because our music is NATURALLY SPOOKY and
            HALLOWEEN-THEMED so it&apos;s the PERFECT TIME OF YEAR for us to perform our TERRIFYING
            TALES about monsters, ghosts, cryptids, and EVIL SUMMER CAMP COUNSELORS!!!
          </p>

          <p>
            If you want to book us for a show at YOUR venue or YOUR private event or YOUR birthday
            party or YOUR wedding or YOUR funeral or YOUR bar mitzvah or YOUR company picnic or YOUR
            alien invasion or YOUR zombie apocalypse, please CONTACT US immediately using the
            contact information provided in the CONTACT section of this WEBSITE!!!
          </p>

          <div className="button">SEE ALL TOUR DATES!!!</div>
          <div className="button">BUY TICKETS NOW!!!</div>
          <div className="button">BOOK US FOR YOUR EVENT!!!</div>
        </div>

        <div className="section" id="contact">
          <h2>📧 GET IN TOUCH WITH US RIGHT NOW IMMEDIATELY 📧</h2>

          <p>
            You can find us on ALL the social media platforms including Facebook, Instagram,
            Twitter, TikTok, YouTube, LinkedIn, MySpace (just kidding, nobody uses MySpace anymore),
            Pinterest, Reddit, Tumblr, Snapchat, Discord, Twitch, and probably SEVERAL OTHER
            platforms that were invented AFTER this website was created!!!
          </p>

          <p>
            You can also email us at our EMAIL ADDRESS or call us on our TELEPHONE or send us a
            LETTER through the POSTAL SERVICE or send us a TELEGRAM or use SMOKE SIGNALS or hire a
            MESSENGER PIGEON or just SHOW UP at one of our shows and TALK TO US in person because we
            are VERY FRIENDLY and APPROACHABLE people who LOVE meeting fans!!!
          </p>

          <p>
            If you are a VENUE OWNER or BOOKING AGENT or RECORD LABEL or MUSIC JOURNALIST or PODCAST
            HOST or RADIO DJ or MUSIC BLOGGER or just a REGULAR PERSON who wants to tell us how much
            you LOVE our music, please DON&apos;T HESITATE to reach out!!! We read EVERY SINGLE
            MESSAGE we receive (eventually, when we have time, which might be a while because
            we&apos;re very busy)!!!
          </p>

          <div className="button">SEND US A MESSAGE!!!</div>
          <div className="button">FOLLOW US ON SOCIAL MEDIA!!!</div>
          <div className="button">JOIN OUR MAILING LIST!!!</div>
        </div>

        <div className="section" id="merch">
          <h2>🛍️ BUY OUR AMAZING MERCHANDISE AND SUPPORT THE BAND 🛍️</h2>

          <p>
            We have SO MUCH COOL STUFF available for purchase including T-SHIRTS, HOODIES, STICKERS,
            PATCHES, POSTERS, VINYL RECORDS, CDs, CASSETTE TAPES, BUTTONS, TOTE BAGS, COFFEE MUGS,
            and maybe even some OTHER THINGS that we haven&apos;t thought of yet but will probably
            make in the FUTURE!!!
          </p>

          <p>
            All of our merchandise features ORIGINAL ARTWORK created by TALENTED ARTISTS who
            understand our UNIQUE AESTHETIC and our COMMITMENT to being SPOOKY and DARK but also
            FUNNY and LIGHTHEARTED at the same time!!!
          </p>

          <p>
            When you buy our merchandise, you are NOT ONLY getting a HIGH-QUALITY PRODUCT that you
            can wear or display or use in your DAILY LIFE, you are ALSO supporting an INDEPENDENT
            BAND and helping us continue to make MORE MUSIC and play MORE SHOWS and spread our
            MESSAGE of SPOOKY EXISTENTIAL PUNK ROCK to the ENTIRE WORLD!!!
          </p>

          <p>
            Sizes available include: EXTRA SMALL, SMALL, MEDIUM, LARGE, EXTRA LARGE, DOUBLE EXTRA
            LARGE, TRIPLE EXTRA LARGE, and CUSTOM SIZES if you contact us DIRECTLY and tell us your
            SPECIFIC MEASUREMENTS!!!
          </p>

          <div className="button">VISIT OUR ONLINE STORE!!!</div>
          <div className="button">SEE ALL PRODUCTS!!!</div>
          <div className="button">SPECIAL DEALS!!!</div>
        </div>

        <div className="marquee">
          <div className="marquee-text">
            💀 THANK YOU FOR VISITING OUR WEBSITE 💀 DON&apos;T FORGET TO FOLLOW US ON SOCIAL MEDIA
            💀 COME TO OUR SHOWS 💀 BUY OUR MERCH 💀 TELL YOUR FRIENDS 💀
          </div>
        </div>

        <footer>
          <p className="flash">© 2025 THE VERY BAD DAYS</p>
          <p className="flash">ALL RIGHTS RESERVED (PROBABLY)</p>
          <p className="flash">BEST VIEWED IN 800x600 RESOLUTION</p>
          <p className="flash">THIS WEBSITE IS OPTIMIZED FOR INTERNET EXPLORER 6</p>
          <p className="flash">WEBMASTER: THE GHOST OF GEOCITIES</p>
          <p className="flash">LAST UPDATED: SOMETIME IN THE RECENT PAST</p>
          <div className="counter">WEBSITE VISITOR COUNTER: 123456789</div>
        </footer>
      </div>
    </>
  );
}
