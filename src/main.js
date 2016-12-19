/**
 * Created by clam on 2016/12/19.
 */
var Test = (function () {
    function Test(_name) {
        this.name = _name;
    }
    Test.prototype.setName = function (_value) {
        this.name = _value;
    };
    Test.prototype.getName = function () {
        return this.name;
    };
    return Test;
}());
/**
 *  测试Lambda 表达式
 * */
var testLambda = (function () {
    function testLambda() {
    }
    testLambda.prototype.testFind = function () {
        var arr = new Array[10];
        for (var i = 0; i < 10; i++)
            arr.push(new Test(i.toLocaleString()));
        return arr.filter(function (s) { return s.name != "1"; });
    };
    return testLambda;
}());
function write(content) {
    document.write(content);
}
write("test");
//# sourceMappingURL=main.js.map