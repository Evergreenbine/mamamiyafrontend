 class ip {
     //  不同模块的地址
     address = {
         shop: "http://localhost:8003",
         user: "http://localhost:8002"
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
         return url
     }
 }

 export { ip }