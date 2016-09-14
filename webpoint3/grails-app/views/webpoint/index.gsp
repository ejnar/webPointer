<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <title>User administration</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

    <style type="text/css">
        [ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak {
            display: none !important;
        }
    </style>
    <asset:link rel="icon" href="favicon.ico" type="image/x-ico" />
    <asset:stylesheet href="bootstrap/css/bootstrap.css"/>
    <asset:stylesheet href="angular-material/angular-material.css"/>
    <asset:stylesheet href="material-design-icons/iconfont/material-icons.css"/>
    <asset:stylesheet href="screen/app.css"/>

    <script type="text/javascript">
        window.contextPath = "${request.contextPath}";
    </script>

</head>

<body ng-app="webpointApp" >

<!-- Add your site or application content here -->
<div id="wrap">

    <div class="container" id="content">   <!-- container-fluid  style="width:60%" -->
    	<div ng-view=""></div>
    </div>

</div>
<asset:javascript src="/webpoint/webpoint.main.js"/>
</body>
</html>