const fileSend = document.getElementById("btnSend");
const btnFormat = document.querySelector(".btnFormat");
const btnExport = document.querySelector(".btnExport");
const btnNoFile = document.querySelector(".btnNoFile");
const btnWithFile = document.querySelector(".btnWithFile");
const allInputsText = document.querySelector(".inputsContainer");
const contentAnimation = document.querySelector(".contentAnimation");

function removeClassAnimation() {
  contentAnimation.classList.add("anima-up");
  setTimeout(() => {
    contentAnimation.classList.remove("anima-up");
  }, 350);
}

function handleNoFile() {
  removeClassAnimation();

  btnWithFile.classList.remove("active");
  fileSend.classList.remove("active");
  btnNoFile.classList.add("active");
  allInputsText.classList.add("active");
}
function handleWithFile() {
  removeClassAnimation();

  allInputsText.classList.remove("active");
  btnNoFile.classList.remove("active");
  btnWithFile.classList.add("active");
  fileSend.classList.add("active");
}

function createDataTableJson() {
  const jsonArray = [];
  const tableLength = Number(document.getElementById("tableLengthInput").value);
  const description = document.getElementById("descriptionInput").value;
  const qrcode = document.getElementById("qrcodeInput").value;
  const TequipId = document.getElementById("equipIdInput").value;
  const TareaId = document.getElementById("areaIdInput").value;
  const TempresaId = document.getElementById("empresaIdInput").value;

  if (tableLength <= 0 || TequipId < 0 || TareaId < 0 || TempresaId < 0) {
    alert("Necessário preencher os campos corretamentes");
  } else {
    for (let i = 0; i < tableLength; i++) {
      const row = {
        numberRow: i + 1,
        id: " ",
        descricao: `${description}`,
        tag: " ",
        qrcode: `${qrcode}`,
        patrimonio: " ",
        capacidade: " ",
        fabricante: " ",
        numerodeserie: " ",
        nr12categoria: " ",
        ano: " ",
        foto: "semfoto.jpg",
        t_equipamento_tipo_id: `${TequipId}`,
        t_area_id: `${TareaId}`,
        t_empresa_id: `${TempresaId}`,
        principal_id: " ",
        t_usuario_id: 1,
        data_gravacao: " ",
        t_dispositivo_id: 1,
        autorizado_checklist: 1,
        nr12: " ",
        nr12risco: " ",
        nr13: " ",
        nr13categoria: " ",
        nr10: " ",
        observacao: " ",
      };
      jsonArray.push(row);
    }
    populateTableFromJson(jsonArray);
  }
}

function populateTableFromJson(dataTableJson) {
  const table = document.getElementById("tbody");
  table.innerHTML = " ";
  dataTableJson.forEach((data, i) => {
    const row = `
    <tr>
      <td>${dataTableJson[i].numberRow}</td>
      <td>${dataTableJson[i].id}</td>
      <td>${dataTableJson[i].descricao}</td>
      <td>${dataTableJson[i].tag}</td>
      <td>${dataTableJson[i].qrcode}</td>
      <td>${dataTableJson[i].patrimonio}</td>
      <td>${dataTableJson[i].capacidade}</td>
      <td>${dataTableJson[i].fabricante}</td>
      <td>${dataTableJson[i].numerodeserie}</td>
      <td>${dataTableJson[i].nr12categoria}</td>
      <td>${dataTableJson[i].ano}</td>
      <td>${dataTableJson[i].foto}</td>
      <td>${dataTableJson[i].t_equipamento_tipo_id}</td>
      <td>${dataTableJson[i].t_area_id}</td>
      <td>${dataTableJson[i].t_empresa_id}</td>
      <td>${dataTableJson[i].principal_id}</td>
      <td>${dataTableJson[i].t_usuario_id}</td>
      <td>${dataTableJson[i].data_gravacao}</td>
      <td>${dataTableJson[i].t_dispositivo_id}</td>
      <td>${dataTableJson[i].autorizado_checklist}</td>
      <td>${dataTableJson[i].nr12}</td>
      <td>${dataTableJson[i].nr12risco}</td>
      <td>${dataTableJson[i].nr13}</td>
      <td>${dataTableJson[i].nr13categoria}</td>
      <td>${dataTableJson[i].nr10}</td>
      <td>${dataTableJson[i].observacao}</td>
    </tr>
    `;
    table.innerHTML += row;
  });
}

function exportTableToExcel() {
  var table2excel = new Table2Excel();
  table2excel.export(document.querySelectorAll("#tbl-data"), "cadastroObjetos");
}

function convertExcelToJson(event) {
  var selectedFile = event.target.files[0];

  if (selectedFile) {
    var fileReader = new FileReader();
    fileReader.onload = function (event) {
      var data = event.target.result;

      var workbook = XLSX.read(data, {
        type: "binary",
      });
      workbook.SheetNames.forEach((sheet) => {
        let rowObject = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheet]
        );
        let jsonObject = JSON.stringify(rowObject);
        const arrayJson = JSON.parse(jsonObject);
        populateTableFromExcelJson(arrayJson);
      });
    };
    fileReader.readAsBinaryString(selectedFile);
  }
}

function populateTableFromExcelJson(dataExcelJson) {
  const table = document.getElementById("tbody");
  table.innerHTML = " ";
  dataExcelJson.forEach((data, i) => {
    const row = `
    <tr>
      <td>${i + 1}</td>
      <td></td>
      <td>${dataExcelJson[i].descricao}</td>
      <td></td>
      <td>${dataExcelJson[i].qrcode}</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td>semfoto.jpg</td>
      <td>${dataExcelJson[i].t_equipamento_tipo_id}</td>
      <td>${dataExcelJson[i].t_area_id}</td>
      <td>${dataExcelJson[i].t_empresa_id}</td>
      <td></td>
      <td>1</td>
      <td></td>
      <td>1</td>
      <td>1</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    `;
    table.innerHTML += row;
  });
}

btnFormat.addEventListener("click", createDataTableJson);
btnExport.addEventListener("click", exportTableToExcel);
btnNoFile.addEventListener("click", handleNoFile);
btnWithFile.addEventListener("click", handleWithFile);
fileSend.addEventListener("change", convertExcelToJson);
