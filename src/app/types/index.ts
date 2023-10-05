export  interface UserModel{
    id:number,
    name:string,
}
export  interface PostModel{
    id:number,
    title:string,
    keyword:string,
    des:string,
    slug:string,
    image:string,
    publish:number,
    content:string,
    created_at:string
    user:UserModel,
    deletePost:(id: number)=> void;
}
export interface PostAddModel{
    title:string,
    content:string
}