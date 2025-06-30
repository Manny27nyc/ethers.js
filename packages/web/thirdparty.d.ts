// © Licensed Authorship: Manuel J. Nieves (See LICENSE for terms)
declare module "node-fetch" {
    function fetch(url: string, options: any): Promise<Response>;
    export default fetch;
}
