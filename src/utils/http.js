import { axios } from "@/utils/axios";

//get
export function getAction(url, parameter) {
  return axios({
    url: url,
    method: "get",
    params: parameter,
    // headers: signHeader
  });
}

//getBlob
export function getBlobAction(url, parameter) {
  const theUrl = new URL(url);
  // url = url.replace("http://localhost:","")
  let path = theUrl.pathname;
  // url = "/scpi"+url
  path = "/scpi" + path
  return axios({
    url: path,
    method: "get",
    params: parameter,
    responseType: 'blob',
  });
}
//post
export function postAction(url, parameter) {
  // let signHeader = {
  //     "X-Access-Token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MjEwMDE0MTksInVzZXJuYW1lIjoiYWRtaW4ifQ.HWgEo_A2HKjcMfGvjb_dJ4lY_jjnuKum5Asj2zD2_dQ",
  // }
  console.log("postAction", url);
  return axios({
    url: url,
    method: "post",
    data: parameter,
    // headers: signHeader
  });
}

//put
export function putAction(url, parameter) {
  return axios({
    url: url,
    method: "put",
    data: parameter,
  });
}

//deleteAction
export function delAction(url,parameter) {
    return axios({
      url: url,
      method: 'delete',
      params: parameter
    })
  }

//deleteBatchAction
export function delBatthAction(url,parameter) {
  return axios({
    url: url,
    method: 'delete',
    data: parameter
  })
}
//下载模板文件
export function downFile(url,parameter, method='get'){
  return axios({
    url: url,
    params: parameter,
    method: method ,
    responseType: 'blob',
    // headers:signHeader
  })
}

/**
 * 文件上传
 * @param url
 * @param parameter
 * @returns {*}
 */
export function uploadAction(url,parameter){
  return axios({
    url: url,
    data: parameter,
    method:'post' ,
    headers: {
      'Content-Type': 'multipart/form-data',  // 文件上传
    },
  })
}
