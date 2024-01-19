import { useState, useEffect } from "react";
import { documentDir } from "@tauri-apps/api/path";
import { writeTextFile } from "@tauri-apps/api/fs";
import { useNotasStore } from "../store/notasStore";
import debounce from "lodash/debounce";
import { FaItalic, FaUnderline, FaBold } from "react-icons/fa";

interface StylesState {
    color: string;
    size: string;
    subrayado: string;
    bold: string;
    italica: string;
}

const TextEditor = () => {
    const [text, setText] = useState<string | null>("");

    const setColor = (newColor: string) =>
        setStyle((prevStyle) => ({ ...prevStyle, color: newColor }));
    const setSize = (newSize: string) =>
        setStyle((prevStyle) => ({ ...prevStyle, size: newSize }));

    const setSubrayado = () =>
        setStyle((prevStyle) => ({
            ...prevStyle,
            subrayado: prevStyle.subrayado === "none" ? "underline" : "none",
        }));
    const setBold = () => {
        setStyle((prevStyle) => ({
            ...prevStyle,
            bold: prevStyle.bold === "none" ? "bold" : "none",
        }));
    };
    const setItalica = () =>
        setStyle((prevStyle) => ({
            ...prevStyle,
            italica: prevStyle.italica === "none" ? "italic" : "none",
        }));

    const [style, setStyle] = useState<StylesState>({
        color: "",
        size: "",
        subrayado: "",
        bold: "",
        italica: "",
    });

    //---unir estilos---//

    //---importa nota seleccionada---//
    const Notaseleccionada = useNotasStore((state) => state.NotaSeleccionada);
    const styles = useNotasStore((state) => state.estilosNotaSeleccionada);

    //---cargar contenido de la nota---//
    useEffect(() => {
        if (Notaseleccionada) {
            setText(Notaseleccionada.contenido);
        }
    }, [Notaseleccionada]);

    //---guardar texto---//
    useEffect(() => {
        if (!Notaseleccionada || !text) return;

        const guardarTexto = async () => {
            console.log(`Guardando texto: ${text}`);
            const desktopPath = await documentDir();
            await writeTextFile(
                `${desktopPath}/FilesNotas/${Notaseleccionada.nombre}`,
                text
            );
        };

        const debouncedGuardarTexto = debounce(guardarTexto, 1000);
        debouncedGuardarTexto();

        return () => {
            debouncedGuardarTexto.cancel();
        };
    }, [text, Notaseleccionada]);

    //---cargar estilos---//
    useEffect(() => {
        if (Notaseleccionada) {
            setStyle(styles);
        }
    }, [Notaseleccionada, styles]);
    //---guardar estilos---//
    useEffect(() => {
        if (!Notaseleccionada || !style) return;

        const guardarEstilos = async () => {
            console.log("Guardando estilos:", style);
            const desktopPath = await documentDir();
            await writeTextFile(
                `${desktopPath}/FilesNotas/styles/${Notaseleccionada.nombre}-style.json`,
                JSON.stringify(style)
            );
        };
        const debouncedGuardarEstilos = debounce(guardarEstilos, 1000);
        debouncedGuardarEstilos();

        return () => {
            debouncedGuardarEstilos.cancel();
        };
    }, [Notaseleccionada, style]);

    return (
        <div className="box-border w-full h-full flex flex-col overflow-hidden">
            <div className="flex gap-5 items-center p-4">
                <select
                    className="h-7 w-12 text-xs text-center  bg-transparent border-2 border-zinc-500 hover:border-cazul active:border-cazul p-1"
                    name="tamaño-fuente"
                    onChange={(e) => {
                        setSize(e.target.value);
                    }}
                    value={style.size}
                >
                    <option value="4px">4px</option>
                    <option value="6px">6px</option>
                    <option value="8px">8px</option>
                    <option value="10px">10px</option>
                    <option value="12px">12px</option>
                    <option value="14px">14px</option>
                    <option value="16px">16px</option>
                    <option value="18px">18px</option>
                    <option value="20px">20px</option>
                    <option value="22px">22px</option>
                    <option value="24px">24px</option>
                    <option value="26px">26px</option>
                    <option value="28px">28px</option>
                    <option value="30px">30px</option>
                    <option value="32px">32px</option>
                </select>

                <div>
                    <input
                        className="h-7 w-12 bg-transparent  border-2 border-zinc-500 hover:border-cazul active:border-cazul"
                        type="color"
                        name="color"
                        value={style.color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                    <label className="hidden" htmlFor="color">
                        Color
                    </label>
                </div>

                <div className="p-1 border-2 border-zinc-500 hover:border-cazul active:border-cazul">
                    <FaUnderline
                        onClick={setSubrayado}
                        type="button"
                        name="subrayado"
                    >
                        Subrayado
                    </FaUnderline>
                </div>

                <div className="p-1 border-2 border-zinc-500 hover:border-cazul active:border-cazul">
                    <FaBold onClick={setBold} type="button" name="bold">
                        bold
                    </FaBold>
                </div>

                <div className="p-1 border-2 border-zinc-500 hover:border-cazul active:border-cazul">
                    <FaItalic onClick={setItalica} type="button" name="italica">
                        Italica
                    </FaItalic>
                </div>
            </div>

            <div className=" flex-1 border-t-2 border-zinc-500 border-solid">
                <textarea
                    name="texto"
                    value={text || ""}
                    onChange={(e) => setText(e.target.value)}
                    style={{
                        color: style?.color,
                        fontSize: style?.size,
                        textDecoration: style?.subrayado,
                        fontWeight: style?.bold,
                        fontStyle: style?.italica,
                    }}
                    className="bg-transparent resize-none focus:none w-full pt-5 pl-2 pr-2 pb-1 outline-none"
                />
            </div>
        </div>
    );
};

export default TextEditor;
