<!doctype html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"><!--<![endif]-->

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Blog using Grails, AngularJS and MongoDB</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <asset:link rel="shortcut icon" href="favicon.ico" type="image/x-icon"/>
    <asset:stylesheet href="bootstrap-css/css/bootstrap.css"/>
    <!-- asset:stylesheet href="bootstrap-css/css/bootstrap-theme.css"/ -->
    
    <asset:stylesheet href="book/app.css"/>
    <asset:javascript src="book.js"/>

    <g:layoutHead/>
</head>

<body ng-app="webApp" >
<!--[if lt IE 7]>
<p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
<![endif]-->

<!-- Add your site or application content here -->
<div id="wrap">
	
    <div ng-include="'book/views/includes/header.html'"></div>
    <div class="container" id="content">   <!-- container-fluid -->
    	<g:layoutBody/>
    </div>
    <div ng-include="'book/views/includes/footer.html'"></div>
    
</div>

</body>
</html>