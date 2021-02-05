 class ip {
     //  不同模块的地址
     address = {
         shop: "http://localhost:8003",
         user: "http://localhost:8002",
         bbs: "http://localhost:8004"
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
         return url
     }
 }

 export { ip }