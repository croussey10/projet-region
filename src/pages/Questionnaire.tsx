import {useState, useEffect} from "react";
import {getFullQuestionnaire} from "../services/themeService.tsx";

interface Etape {
    idCategorie: string;
    nomCategorie: string;
    nomTheme: string;
    options: {
        uid: string;
        reponse_text: string;
        points: number;
    }[];
}

export function Questionnaire() {
    const [listeEtapes, setListeEtapes] = useState<Etape[]>([]);
    const [index, setIndex] = useState(0);
    const [reponsesChoisies, setReponsesChoisies] = useState<Record<string, string>>({});
    const [chargement, setchargement] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const data = await getFullQuestionnaire('agent');

                const listeReponseTemp: Etape[] = [];

                data.forEach((theme) => {
                    theme.category.forEach((cat) => {
                        listeReponseTemp.push({
                            idCategorie: cat.uid,
                            nomTheme: theme.name,
                            nomCategorie: cat.name,
                            options: cat.reponse
                        });
                    });
                });

                setListeEtapes(listeReponseTemp);

            } catch (err) {
                console.error(err);
            } finally {
                setchargement(false);
            }
        })();
    }, []);

    if (chargement) return <p>Chargement...</p>;
    if (listeEtapes.length === 0) return <p>Aucune donnée.</p>;

    const etapeCourante = listeEtapes[index];
    const dejaRepondu = reponsesChoisies[etapeCourante.idCategorie];

    const selectionner = (idReponse: string) => {
        setReponsesChoisies({
            ...reponsesChoisies,
            [etapeCourante.idCategorie]: idReponse
        });
    };

    console.log(reponsesChoisies)

    return (
        <div>
            <h1>Questionnaire</h1>

            <p>Question {index + 1} / {listeEtapes.length}</p>
            <progress value={index + 1} max={listeEtapes.length}></progress>

            <div>
                <p><strong>Thème :</strong> {etapeCourante.nomTheme}</p>
                <h2>{etapeCourante.nomCategorie}</h2>

                <div>
                    {etapeCourante.options.map((opt) => (
                        <button
                            key={opt.uid}
                            onClick={() => selectionner(opt.uid)}
                            style={{display: 'block', margin: '5px 0'}}
                        >
                            {dejaRepondu === opt.uid ? "✅ " : ""}{opt.reponse_text}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                {index < listeEtapes.length - 1 ? (
                    <button onClick={() => setIndex(index + 1)} disabled={!dejaRepondu}>
                        Suivant
                    </button>
                ) : (
                    <button onClick={() => alert("Fini !")} disabled={!dejaRepondu}>
                        Terminer
                    </button>
                )}

                <button onClick={() => setIndex(0)}>Recommencer</button>
            </div>
        </div>
    );
}