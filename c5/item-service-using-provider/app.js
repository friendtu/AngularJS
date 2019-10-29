function ItemService(opt_items) {
    var items=opt_items||[];
    this.list=function(){
        return items;
    };

    this.add=function(item) {
        items.push(item);
    };
}

angular.module("notesApp",[])
    .controller('MainCtrl',['$log',function($log){
        var self=this;
        self.tab="first";
        self.open=function(tab){
            self.tab=tab;
            $log.log("send a log")
        };
    }])
    .controller('SubCtrl',['ItemService',function(ItemService){
        var self=this;
        self.list=function(){
            return ItemService.list();
        };

        self.add=function(){
            ItemService.add({
                id:self.list().length+1,
                label:'Item '+self.list().length
            });
        };
    }])
    .provider('ItemService',function(){
        var haveDefaultItems=true;

        this.disableDefaultItems=function() {
            haveDefaultItems=false;
        };

        this.$get=[function(){
            var optItems=[];
            if(haveDefaultItems) {
                optItems=[
                    {id:1,label:'Item 0'},
                    {id:2,label:'Item 1'}
                ];
            }
            return new ItemService(optItems);
        }];
    })
    .config(['ItemServiceProvider',function(ItemServiceProdiver){
        var shouldHaveDefaults=false;
        if(!shouldHaveDefaults) {
            ItemServiceProdiver.disableDefaultItems();
        }
    }]);