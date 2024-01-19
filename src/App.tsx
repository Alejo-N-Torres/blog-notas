import { Toaster } from "react-hot-toast";
import EditorNota from "./components/editor_nota";
import FormNotas from "./components/form_nota";
import ListaNotas from "./components/lista_nota";

const App = () => {
    return (
        <div className="bg-neutral-800 h-screen text-white grid grid-cols-12">
            <div className="col-span-3 flex flex-col gap-5">
                <FormNotas />
                <ListaNotas />
            </div>
            <div className="col-span-9 bg-zinc-800 flex justify-center items-center">
                <EditorNota />
            </div>
            <Toaster />
        </div>
    );
};
export default App;
