<html>

<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
</head>

<body>

<div class="container-fluid">
    <div class="row">
        <div class="col-xs-12 col-md-8 col-md-offset-2">
            {{ readme }}
            <h2>End Points</h2>
            {% for doc in docs %}
            <code><a href="{{doc.endpoint}}">{{doc.endpoint}}</a></code> 
            - {{ doc.desc }}
            <hr />
            {% endfor %}
        </div>
    </div>
</div>

</body>

</html>
