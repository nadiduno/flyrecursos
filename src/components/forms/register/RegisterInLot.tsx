import { ButtonFly } from "../../botoes/ButtonFly";
import { FaFileExcel } from "react-icons/fa";

export interface TableRowDataModule {
  id: number;
  titulo: string;
}

export function RegisterInLot() {
  return (
    <div className="w-full flex-row text-xs my-3 p-1 md:p-3 lg:p-3">
      <div className="h-[3rem] md:h-[6rem] lg:h-[6rem] rounded-lg border border-primary2">
        <div className="flex items-center justify-between p-2 md:p-6 lg:p-6">
          <p className="text-xl font-medium">Matricular em lote</p>
        </div>
      </div>
      <div className="h-[13rem] md:h-[19rem] lg:h-[19rem] rounded-lg border border-primary2 overflow-auto my-4">
        <div className="flex justify-center p-5">
          <ButtonFly
            text="Carregar planilha"
            // onClick=
            icon={FaFileExcel}
            iconPosition="left"
          />
        </div>
      </div>
    </div>
  );
}
