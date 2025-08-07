import { useState, useEffect } from "react";
import { Howl } from 'howler';

type NodeID = string;

type QuestionNode = {
  text: string;
  options: { [key: NodeID]: string };
};

type ResultNode = {
  text: string;
  description?: string;
  options?: undefined;
};

type DecisionTree = {
  [key: NodeID]: QuestionNode | ResultNode;
};

const decisionTree: DecisionTree = {
  start: {
    text: "Vorresti che il tuo personaggio lanciasse incantesimi, combattesse senza incantesimi o un mix delle due?",
    options: {
      "1": "Lancia incantesimi",
      "2": "Combatte senza incantesimi",
      "3": "Un mix dei due",
    },
  },

  "1": {
    text: "Il tuo personaggio ha dedicato tutta la sua vita a questa magia o è qualcosa che gli viene più naturale?",
    options: {
      "4": "Tutta la vita",
      "5": "Gli viene naturale",
    },
  },
  "4": {
    text: "Il tuo personaggio si concentra di più sul suo credo o sui suoi studi?",
    options: {
      "6": "Credo",
      "7": "Studi",
    },
  },
  "6": {
    text: "Il suo credo è uno di fede e religione o uno di asservimento e di ricerca di potere?",
    options: {
      end1: "Fede e religione",
      end2: "Asservimento e potere",
    },
  },
  "7": {
    text: "Il tuo personaggio preferisce essere il più versatile possibile o concentrarsi sugli incantesimi più potenti?",
    options: {
      end3: "Versatile",
      "60": "Incantesimi più potenti",
    },
  },
  "60": {
    text: "Il tuo personaggio è più interessato alla magia pura o più agli elementi naturali?",
    options: {
      end4: "Magia pura",
      end31: "Elementi naturali",
    },
  },
  "5": {
    text: "Il tuo personaggio preferisce conoscere una grande quantità di incantesimi tra cui scegliere ogni giorno o pochi incantesimi che può usare a piacimento?",
    options: {
      "25": "Grande quantità tra cui scegliere",
      "26": "Pochi ma illimitati",
    },
  },
  "25": {
    text: "Il tuo personaggio preferisce essere più versatile o più diretto e distruttivo?",
    options: {
      end5: "Versatile",
      end6: "Diretto e distruttivo",
    },
  },
  "26": {
    text: "Il tuo personaggio è più affine a creature di altri mondi o ai potenti draghi?",
    options: {
      end7: "Creature di altri mondi",
      end8: "Potenti draghi",
    },
  },

  "2": {
    text: "Che tipo di armi utilizza il tuo personaggio? A lungo raggio? Combattimento ravvicinato? O preferisce non usare armi?",
    options: {
      "8": "Lungo raggio",
      "9": "Combattimento ravvicinato",
      "10": "Non usa armi",
    },
  },
  "8": {
    text: "Il tuo personaggio vorrebbe avere un compagno animale?",
    options: {
      end9: "Sì",
      "12": "No",
    },
  },
  "12": {
    text: "Al tuo personaggio piace avere tante opzioni diverse in combattimento o preferisce specializzarsi su una singola cosa?",
    options: {
      "30": "Tante opzioni",
      "29": "Specializzarsi",
    },
  },
  "30": {
    text: "Il tuo personaggio preferisce uno stile pesante e resistente, mobile e atletico o uno versatile?",
    options: {
      end10: "Pesante e resistente",
      end11: "Mobile e atletico",
      end12: "Versatile",
    },
  },
  "29": {
    text: "Il tuo personaggio usa prevalentemente tecniche e strategie o la sua abilità e forza?",
    options: {
      "44": "Strategie",
      end15: "Abilità e forza",
    },
  },
  "44": {
    text: "Il tuo personaggio usa le sue capacità per battere l'avversario o per guidare il gruppo?",
    options: {
      end13: "Battere l'avversario",
      end14: "Guidare il gruppo",
    },
  },
  "9": {
    text: "Il tuo personaggio combatte in modo normale o anche con trucchi sporchi o brutali?",
    options: {
      "13": "Soprattutto normale",
      "14": "Non si trattiene dall'usare ogni mezzo",
    },
  },
  "13": {
    text: "Il tuo personaggio, in combattimento, preferisce avere tante opzioni o specializzarsi?",
    options: {
      "30": "Tante opzioni",
      "29": "Specializzarsi",
    },
  },
  "14": {
    text: "Il tuo personaggio combattime con forza bruta o in modo più sottile e preciso?",
    options: {
      end16: "Forza bruta",
      end17: "Sottile e preciso",
    },
  },

  "10": {
    text: "Il tuo personaggio usa arti marziali o mezzi ferali?",
    options: {
      end18: "Arti marziali",
      end19: "Mezzi ferali",
    },
  },

  "3": {
    text: "Il tuo personaggio combatte più con la magia o più in altri modi?",
    options: {
      "17": "Magia",
      "18": "Altri modi",
    },
  },
  "17": {
    text: "Il tuo personaggio si sente più vicino alla vita di città o alla natura?",
    options: {
      "19": "Città",
      "20": "Natura",
    },
  },
  "19": {
    text: "Il tuo personaggio vuole fare un po' tutto o ha interessi specifici?",
    options: {
      end20: "Un po' tutto",
      "34": "Interessi specifici",
    },
  },
  "34": {
    text: "Al tuo personaggio interessa maggiormente l'arte, la scienza o il combattimento?",
    options: {
      end21: "Arte",
      end22: "Scienza",
      "39": "Combattimento",
    },
  },
  "39": {
    text: "Il tuo personaggio sceglie maggiormente il combattimento diretto o tramite sotterfugi?",
    options: {
      end23: "Diretto",
      end24: "Sotterfugi",
    },
  },
  "20": {
    text: "Il tuo personaggio ha un legame più forte con gli elementi o con gli animali?",
    options: {
      end25: "Elementi",
      end26: "Animali",
    },
  },
  "18": {
    text: "Il tuo personaggio si concentra maggiormente sul suo credo, sul suo potere o sui suoi studi?",
    options: {
      "50": "Il suo credo",
      end28: "I suoi studi",
      "61": "Il suo potere",
    },
  },
  "50": {
    text: "Il credo del tuo personaggio viene da una divinità esterna o da una spiritualità interna?",
    options: {
      end27: "Divinità esterna",
      end30: "Spiritualità interna",
    },
  },
  "61": {
    text: "Il tuo personaggio vuole specializzarsi più nei suoi poteri, o più nelle sue tecniche di combattimento?",
    options: {
      end32: "Poteri",
      end29: "Tecniche di combattimento",
    },
  },

  // Results
  end1: { text: "Chierico", description: "Incantatore divino legato a una divinità, guarisce e combatte il male o semina il terrore con i suoi poteri necromantici." },
  end2: { text: "Binder", description: "Invoca poteri da entità demoniache con cui stringe patti temporanei." },
  end3: { text: "Archivista", description: "Incantatore divino che apprende una grande varietà di magie tramite studio e disciplina." },
  end4: { text: "Mago", description: "Maestro degli incantesimi arcani ottenuti attraverso studio e disciplina." },
  end5: { text: "Psion", description: "Usa la forza della mente per manipolare la realtà intorno a sé." },
  end6: { text: "Stregone", description: "Incantatore che lancia potenti magie arcane con spontaneità." },
  end7: { text: "Warlock", description: "Incantatore che ottiene i suoi poteri soprannaturali da un patto con entità extraplanari." },
  end8: { text: "Dragonfire Adept", description: "Incantatore con poteri draconici, usa soffio draconico e magie legate ai draghi." },
  end9: { text: "Ranger", description: "Combattente esperto nella natura e nell'esplorazione, assieme al suo compagno animale." },
  end10: { text: "Crusader", description: "Guerriero pesante guidato da ideali, usa manovre e tattiche per resistere ai colpi e rispondere con forza." },
  end11: { text: "Swordsage", description: "Maestro delle arti marziali mistiche, agile e strategico." },
  end12: { text: "Warblade", description: "Guerriero disciplinato che usa le sue conoscenze delle armi per dominare in combattimento." },
  end13: { text: "Swashbuckler", description: "Duellante elegante e intelligente, abile nel combattimento acrobatico e preciso." },
  end14: { text: "Maresciallo", description: "Leader carismatico che guida il gruppo con tattiche e ispirazione." },
  end15: { text: "Guerriero", description: "Esperto di stili di combattimento e delle armi, ciascuno si specializza come vuole." },
  end16: { text: "Barbaro", description: "Combattente brutale che entra in furia per aumentare la propria forza." },
  end17: { text: "Ladro", description: "Abile in sotterfugi, trappole e attacchi precisi, sfrutta la sorpresa per sconfiggere i nemici." },
  end18: { text: "Monaco", description: "Maestro delle arti marziali, combatte a mani nude con velocità e disciplina." },
  end19: { text: "Totemist", description: "Usa l'essenza delle creature magiche per ottenere poteri mistici e trasformare il suo corpo." },
  end20: { text: "Factotum", description: "Versatile tuttofare, capace di usare abilità, incantesimi e trucchi." },
  end21: { text: "Bardo", description: "Incantatore e artista, supporta il gruppo con musica e magia." },
  end22: { text: "Artefice", description: "Esperto di oggetti magici e tecnologia arcana, crea e modifica strumenti, armi e armature." },
  end23: { text: "Mago combattente", description: "Unisce incantesimi spontanei e armi, abile sia nella magia che nel corpo a corpo." },
  end24: { text: "Beguiler", description: "Illusionista e manipolatore, specializzato in inganno e sotterfugi per colpire il suo avversario." },
  end25: { text: "Shugenja", description: "Incantatore divino naturale, legato agli elementi e al loro potere." },
  end26: { text: "Druido", description: "Protettore della natura, può trasformarsi in animali e lanciare incantesimi naturali." },
  end27: { text: "Paladino", description: "Guerriero sacro, incarna giustizia e bontà con i suoi poteri divini." },
  end28: { text: "Duskblade", description: "Combina incantesimi arcani e attacchi fisici in un'unica forma di combattimento." },
  end29: { text: "Guerriero psionico", description: "Usa la forza della sua mente per potenziare i propri attacchi fisici e dominare i suoi avversari." },
  end30: { text: "Soulborn", description: "Guerriero che usa il proprio spirito per potenziare sé e i propri alleati in combattimento." },
  end31: { text: "Wu Jen", description: "Un misterioso arcanista i cui poteri controllano gli spiriti, la natura e gli elementi." },
  end32: { text: "Ardent", description: "Un guerriero dai vasti poteri psionici, che usa per risultare vittorioso in ogni possibile situazione." }
};

const buttonStyle: React.CSSProperties = {
  fontSize: "1em",
  padding: "8px 16px",
  margin: "4px",
  borderRadius: "4px",
  border: "none",
  backgroundColor: "#4CAF50",
  color: "white",
  cursor: "pointer",
};

const goBackButtonStyle: React.CSSProperties = {
  fontSize: "0.8em",
  padding: "6px 12px",
  margin: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  backgroundColor: "transparent",
  cursor: "pointer",
};

const appContainerStyle: React.CSSProperties = {
  backgroundColor: 'transparent', // Let the body background show through
  backgroundImage: 'none',
  minHeight: '100vh',
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingTop: '20px',
  color: '#e8dcc0', // Match your fantasy theme colors
  fontFamily: "'Crimson Text', serif", // Match your fantasy fonts
  margin: 0,
  padding: '20px 20px 0 20px',
  boxSizing: 'border-box',
};

export default function App() {
  const [currentNode, setCurrentNode] = useState<NodeID>("start");
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [history, setHistory] = useState<NodeID[]>(["start"]);
  const [optionClickSound, setOptionClickSound] = useState<Howl | null>(null);
  const [resultSound, setResultSound] = useState<Howl | null>(null); // State for the result sound
  const [musicSound, setMusicSound] = useState<Howl | null>(null); // State for the music
  const [musicPlaying, setMusicPlaying] = useState(false); // Track if music is playing
  const [diceRollSound, setDiceRollSound] = useState<Howl | null>(null); // State for dice roll sound
  const [isRollingDice, setIsRollingDice] = useState(false); // Track if dice is rolling
  const [showResult, setShowResult] = useState(false); // Track if we should show the result
  const node = decisionTree[currentNode];

  const resultSoundPath = '/assets/ding.mp3'; // Path to the single result sound - DING.MP3
  const musicSoundPath = '/assets/music.mp3'; // Path to the music
  const diceRollSoundPath = '/assets/dice-roll.mp3'; // Path to the dice roll sound

  useEffect(() => {
    // Load the option click sound
    const newOptionClickSound = new Howl({
      src: ['/assets/click.mp3'], // Corrected path
      preload: true,
      onload: () => {
        console.log("Option click sound loaded successfully");
      },
      onloaderror: (error: any) => { // Removed soundId, typed error
        console.error("Error loading option click sound:", error);
      }
    });
    setOptionClickSound(newOptionClickSound);

    // Load the result sound
    const newResultSound = new Howl({
      src: [resultSoundPath], // Corrected path
      preload: true,
      onload: () => {
        console.log("Result sound loaded successfully");
      },
      onloaderror: (error: any) => { // Removed soundId, typed error
        console.error("Error loading result sound:", error);
      },
      onplayerror: (error: any) => { // Removed soundId, typed error
        console.error("Error playing result sound:", error);
      }
    });
    setResultSound(newResultSound);

    // Load the music sound
    const newMusicSound = new Howl({
      src: [musicSoundPath], // Corrected path
      loop: true, // Enable looping
      preload: true,
      onload: () => {
        console.log("Music sound loaded successfully");
      },
      onloaderror: (error: any) => { // Removed soundId, typed error
        console.error("Error loading music sound:", error);
      }
    });
    setMusicSound(newMusicSound);

    // Load the dice roll sound
    const newDiceRollSound = new Howl({
      src: [diceRollSoundPath],
      preload: true,
      onload: () => {
        console.log("Dice roll sound loaded successfully");
      },
      onloaderror: (error: any) => {
        console.error("Error loading dice roll sound:", error);
      }
    });
    setDiceRollSound(newDiceRollSound);

    return () => {
      if (newOptionClickSound) newOptionClickSound.unload();
      if (newResultSound) newResultSound.unload();
      if (newMusicSound) newMusicSound.unload(); // Unload the music
      if (newDiceRollSound) newDiceRollSound.unload(); // Unload the dice roll sound
    };
  }, [resultSoundPath, musicSoundPath, diceRollSoundPath]); // Only re-run if paths change

  // Effect to trigger dice roll animation when reaching a result node
  useEffect(() => {
    if (!node?.options && !isRollingDice && !showResult) { // Check if it's a result node and not already rolling
      console.log("Starting dice roll animation");
      setIsRollingDice(true);
      setShowResult(false);
      
      // Play dice roll sound
      if (diceRollSound) {
        diceRollSound.play();
      }
      
      // After 3 seconds, stop rolling and show result
      setTimeout(() => {
        setIsRollingDice(false);
        setShowResult(true);
        
        // Play result sound
        if (resultSound) {
          console.log("Playing result sound");
          resultSound.play();
        }
      }, 3000);
    }
  }, [node, diceRollSound, resultSound, isRollingDice, showResult]); // Depend on relevant state

  // Effect to start music when the component mounts or restarts
  useEffect(() => {
    if (musicSound && !showStartScreen && !musicPlaying) {
      console.log("Playing music");
      musicSound.play();
      setMusicPlaying(true); // Set musicPlaying to true
    }
  }, [musicSound, showStartScreen, musicPlaying]);

  const restart = () => {
    setCurrentNode("start");
    setHistory(["start"]);
    setIsRollingDice(false);
    setShowResult(false);
  };

  const restartFromBeginning = () => {
    setCurrentNode("start");
    setShowStartScreen(true);
    setHistory(["start"]);
    setIsRollingDice(false);
    setShowResult(false);

    // Stop the current music if it's playing
    // if (musicSound) {
    //   musicSound.stop();
    //   musicSound.play(); // Restart music on start from beginning
    // }
  };

  const goToPreviousNode = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const previousNode = newHistory[newHistory.length - 1];
      setCurrentNode(previousNode);
      setHistory(newHistory);
    }
  };

  const handleOptionClick = (nextId: NodeID) => {
    // Play the click sound
    if (optionClickSound) {
      optionClickSound.play();
    }

    setCurrentNode(nextId);
    setHistory([...history, nextId]);
  };

  return (
    <div style={appContainerStyle}>
      {showStartScreen ? (
        <>
          <div
            className="fantasy-container"
            style={{
              maxWidth: 650,
              margin: "40px auto",
              padding: 48,
              textAlign: "center" as const,
            }}
          >
            <h1 style={{ fontSize: "3.5em", marginBottom: 32 }}>
              Trova la tua classe
            </h1>
            <p style={{ fontSize: "1.3em", marginBottom: 32, lineHeight: 1.6 }}>
              Scopri quale classe di Dungeons & Dragons si adatta meglio al tuo
              stile di gioco
            </p>
            <button
              onClick={() => {
                setShowStartScreen(false);
                if (musicSound && !musicPlaying) {
                  musicSound.play();
                  setMusicPlaying(true);
                }
              }}
              style={buttonStyle}
            >
              Inizia l'Avventura
            </button>
          </div>
        </>
      ) : node ? (
        node.options ? (
          <>
            <div
              className="fantasy-container"
              style={{
                maxWidth: 650,
                margin: "40px auto",
                padding: 32,
                textAlign: "center" as const,
              }}
            >
              <h2 style={{ marginBottom: 24, fontSize: "1.6em" }}>
                {node.text}
              </h2>
              <div style={{ display: "flex", flexDirection: "column" as const, gap: 16 }}>
                {Object.entries(node.options).map(([nextId, optionText]) => (
                  <button
                    key={nextId}
                    onClick={() => handleOptionClick(nextId)}
                    style={buttonStyle}
                  >
                    {optionText}
                  </button>
                ))}
              </div>
              {history.length > 1 && (
                <button
                  onClick={goToPreviousNode}
                  className="go-back-button"
                  style={goBackButtonStyle}
                >
                  Torna indietro
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            {isRollingDice ? (
              <div
                className="dice-container fantasy-container"
                style={{
                  maxWidth: 650,
                  margin: "40px auto",
                  padding: 32,
                  textAlign: "center" as const,
                }}
              >

                <div className="dice-rolling-text">Sto tirando il dado</div>
                <div className="dice-subtitle">Per trovare la tua classe...</div>
              </div>
            ) : showResult ? (
              <div
                className="result-container"
                style={{
                  maxWidth: 650,
                  margin: "40px auto",
                  padding: 32,
                  textAlign: "center" as const,
                }}
              >
                <div style={{ fontSize: 48, marginBottom: 16 }}>⚔️</div>
                <h2 className="result-title">La tua classe: {node.text}</h2>
                {"description" in node && (
                  <p className="result-description">
                    {node.description}
                  </p>
                )}
                <button
                  className="restart-button"
                  onClick={restartFromBeginning}
                  style={buttonStyle}
                >
                  Ricomincia l'Avventura
                </button>
              </div>
            ) : null}
          </>
        )
      ) : (
        <>
          <div style={{ padding: 20 }}>
            <p>Errore: nodo non trovato</p>
            <button onClick={restart} style={buttonStyle}>
              Ricomincia
            </button>
          </div>
        </>
      )}
    </div>
  );
}