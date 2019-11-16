describe('ItemCtrl with inline mock',function(){
    beforeEach(module('notesApp1'));
    var ctrl,mockService;
    beforeEach(module({
        ItemService:{
            list:function() {
                return [{id:1,label:'Mock'}];
            }
    }}));

    beforeEach(inject(function($controller){
        ctrl=$controller('ItemCtrl');
    }));

    it('should load mocked out items',function(){
        expect(ctrl.items).toEqual([{id:1,label:'Mock'}]);
    });
});