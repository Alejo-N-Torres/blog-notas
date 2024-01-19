import { documentDir } from "@tauri-apps/api/path";
import { writeTextFile, createDir } from "@tauri-apps/api/fs";
import { useState } from "react";
import { useNotasStore } from "../store/notasStore";
import toast from "react-hot-toast";

const FormNotas = () => {
    const [nombreNota, setNombreNota] = useState<string>("");

    const agregarNota = useNotasStore((state) => state.agregarNombreNota);

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                const documentPath = await documentDir();
                try {
                    await createDir(`${documentPath}/FilesNotas`);
                } catch (error) {}
                await writeTextFile(
                    `${documentPath}/FilesNotas/${nombreNota}`,
                    ""
                );
                try {
                    await createDir(`${documentPath}/FilesNotas/styles`);
                } catch (error) {}
                setNombreNota("");
                agregarNota(nombreNota);
                toast.success("Nota guardada", {
                    duration: 2000,
                    position: "bottom-right",
                    style: {
                        background: "#202020",
                        color: "#fff",
                    },
                });
            }}
        >
            <input
                className="bg-zinc-900 w-full border-none outline-none p-4"
                type="text"
                placeholder="Nombre de nota"
                onChange={(e) => setNombreNota(e.target.value)}
                value={nombreNota}
            />
            <button className="hidden">guardar</button>
        </form>
    );
};
export default FormNotas;
