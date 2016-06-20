var ref = new Wilddog("https://bkmk.wilddogio.com/todo");

var BabyList = React.createClass({
    getInitialState: function () {
        return {};
    },
    componentDidMount: function () {
        var me = this;
        ref.on("value", function(datasnapshot,error) {
            if (error == null) {
                var D = datasnapshot.val();
                me.replaceState(D)
            }
        });
    },
    handleDelClick: function (e) {
        var target = e.target ;
        if (!$(target).hasClass('btn_del')) { return  ; }

        var key = $($(e.target).parent()).data('index');
        if (key) {
            ref.child(key).remove();
        }
    },
    render: function () {
        var D  = this.state ;
        var str = []; 
        for (var i in D) {
            var k = D[i];
            str.push(<li key={i} data-index={i} onClick={this.handleDelClick}>name is : {k.name} <button className="btn btn_edit">Edit</button> <button className="btn btn_del">Delete</button></li>); 
        }
        return (<div>{str}</div>) ;
    }
});
ReactDOM.render(<BabyList />, document.getElementById('babyList') );

//add
var BabyAdd = React.createClass({
    getInitialState: function () {
        return {babyName: ''};
    },
    componentDidMount: function () {
        var me = this;
    },
    handleClick: function () {
        var v = this.refs.txt.value ;
        ref.push({
            "name": v,
            "url": 'default url'
        })
    },
    handleChange: function (e) {
        this.setState({babyName: e.target.value});
    },
    render: function () {
        var D  = this.state ;
        var str = []; 
        str.push(<input ref="txt" value={D.babyName} placeholder="write sth" onChange={this.handleChange} type="text" />);
        str.push(<button onClick={this.handleClick}>Add</button>);
        return (<div>{str}</div>) ;
    }
});
ReactDOM.render(<BabyAdd />, document.getElementById('babyAdd') );

//ref.on("value", function(datasnapshot,error) {
    //if (error == null) {
        //var D = datasnapshot.val();
        //var strHtml = '';
        //for (var i in D) {
            //var k = D[i];
            //strHtml += '<a href="'+ k.url +'">' + k.name + '</a><b data-key="'+i+'" class="btn btn-info">Update</b> <span data-key="'+i+'" class="btn btn-danger">Delete</span> <br>'; 
        //}
        //$('#linkList').html(strHtml);
    //}
//});
