 class ip {
     //  不同模块的地址
     address = {
         shop: "http://localhost:8003",
         user: "http://localhost:8002",
         bbs: "http://localhost:8004",
         admin: "http://localhost:8005"
     };
     constructor() {};
     getUrl(moudule) {
         let url;
         if (moudule === "shop") {
             url = this.address.shop
         }
         if (moudule === "user") {
             url = this.address.user
         }
         if (moudule === "bbs") {
             url = this.address.bbs
         }
         if (moudule === "admin") {
             url = this.address.admin
         }
         return url
     }
 }

 export { ip }