const httpRequest = jest.fn(()=>{
    return Promise.resolve({
    status:``,
    data: {}
    })
});
export default httpRequest;