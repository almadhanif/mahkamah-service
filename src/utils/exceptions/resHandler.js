const path = require('path');
const fs = require('fs');

const ClientError = require('./ClientError');
// const generateExcel = require('../../commons/helpers/generateExcel');
// const generateExcelMultiSheet = require('../../commons/helpers/generateExcelMultiSheet');
const { stringify } = require('flatted');

exports.resErrorHandler = (res, error) => {
  if (error.code === 'ECONNREFUSED') {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: 'service unavailable',
      dev: error,
    });
  }

  /** sequelieze err */
  if (error?.parent?.code === 'ER_DATA_TOO_LONG') {
    return res.status(400).json({
      status: false,
      message: error?.parent?.sqlMessage,
      dev: error,
    });
  }

  if (error instanceof ClientError) {
    const response = {
      success: false,
      message: error.message,
      error: error.errors,
    };
    return res.status(error.statusCode).json(response);
  }

  if (error.response) {
    return res.status(error.response.status).json(error.response.data);
  }

  // Server ERROR!
  console.log(error);
  console.log(error.message);
  const response = {
    success: false,
    message: error?.message || 'Maaf, terjadi kegagalan pada server kami.',
    dev: JSON.parse(stringify(error)),
  };

  return res.status(500).json(response);
};

exports.resSuccessHandler = (res, data, message = 'success', code = 200) => {
  const response = {
    success: true,
    data,
    message: message,
    code,
  };
  return res.status(code).send(response);
};

// /** resDownloadSingleSheetExcelHandler
//  *
//  * @param {*} res
//  * @param {Object[]} data - the data that will be exported
//  * @param {Object} fileMeta
//  * @param {string} fileMeta.sheetname
//  * @param {string} fileMeta.output_path
//  * @param {string} fileMeta.filename
//  */
// exports.resDownloadSingleSheetExcelHandler = (res, data, fileMeta = {}) => {
//   const { reader, workbook } = generateExcel(data, fileMeta.sheetname);

//   reader.writeFile(
//     workbook,
//     path.join(fileMeta.output_path, fileMeta.filename)
//   );

//   return res.download(
//     path.join(fileMeta.output_path, fileMeta.filename),
//     (err) => {
//       if (!err) {
//         fs.unlink(path.join(fileMeta.output_path, fileMeta.filename), () => {});
//       }
//     }
//   );
// };

// /** resDownloadMultiSheetExcelHandler
//  *
//  * @param {*} res
//  * @param {Object[]} data
//  * @param {Object[]} data[].data - the data that will be exported
//  * @param {Object} data[].meta - the meta object of each data
//  * @param {string} data[].meta.sheetname - the data that will be exported
//  * @param {Object} fileMeta
//  * @param {string} fileMeta.output_path
//  * @param {string} fileMeta.filename
//  */
// exports.resDownloadMultiSheetExcelHandler = (res, data, fileMeta = {}) => {
//   const { reader, workbook } = generateExcelMultiSheet(data);

//   reader.writeFile(
//     workbook,
//     path.join(fileMeta.output_path, fileMeta.filename)
//   );

//   return res.download(
//     path.join(fileMeta.output_path, fileMeta.filename),
//     (err) => {
//       if (!err) {
//         fs.unlink(path.join(fileMeta.output_path, fileMeta.filename), () => {});
//       }
//     }
//   );
// };
