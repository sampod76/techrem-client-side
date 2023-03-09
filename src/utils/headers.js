export const headers = {
    'content-type': 'application/json',
    authorization: `${localStorage.getItem('tech_token')}`,
    // authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1YnJvdG9tb2p1bWRlcjAzQGdtYWlsLmNvbSIsImlhdCI6MTY3NzkxMTIxMX0.c1a1DSXjDRklk9XlHKzIf5ZrtIq_6OFHRGq_oEB2Cf0",
};

export const multipartHeaders = {
    "Content-Type": "multipart/form-data",
    'Access-Control-Allow-Origin': `${process.env.REACT_APP_DEV_URL}`,
    'Access-Control-Allow-Credentials': 'true'
};
