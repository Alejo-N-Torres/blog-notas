import { useNotasStore } from "../store/notasStore";
import { IconContext } from "react-icons/lib";
import { FiEdit3 } from "react-icons/fi";
import TextEditor from "./editor_de_texto";

//!---------------------styles---------------------!//

const EditorNota = () => {
    const Notaseleccionada = useNotasStore((state) => state.NotaSeleccionada);
    return (
        <>
            {Notaseleccionada ? (
                <TextEditor />
            ) : (
                <div className="box-border size-full items-center flex justify-center">
                    <IconContext.Provider
                        value={{
                            className: "box-border size-5/12 text-neutral-700",
                        }}
                    >
                        <FiEdit3 />
                    </IconContext.Provider>
                </div>
            )}
        </>
    );
};
export default EditorNota;
