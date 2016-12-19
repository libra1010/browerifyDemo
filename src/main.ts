/**
 * Created by clam on 2016/12/19.
 */
class  Test{
    name:string;
    constructor(_name:string){
        this.name = _name;
    }

    setName(_value:string){
        this.name=_value;
    }

    getName():string{
        return this.name;
    }
}

/**
 *  测试Lambda 表达式
 * */
class testLambda{
    testFind():Array<Test>{
        var arr = new Array[10];
        for (var i = 0;i<10;i++)
            arr.push(new Test(i.toLocaleString()));

        return arr.filter(s=>s.name!="1");
    }
}

function write(content:string){
    document.write(content);
}
write("test");
