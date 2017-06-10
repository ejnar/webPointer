<!doctype html>
<html lang="en" class="no-js">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <title>SongPoint</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

    <style type="text/css">
        [ng\:cloak], [ng-cloak], [data-ng-cloak], [x-ng-cloak], .ng-cloak, .x-ng-cloak {
            display: none !important;
        }
    </style>
    <asset:link rel="icon" href="favicon.ico" type="image/x-ico" />
    <asset:stylesheet href="angular-material/angular-material.css"/>
    <asset:stylesheet href="material-design-icons/iconfont/material-icons.css"/>
    <asset:stylesheet href="screen/app.css"/>
    <script type="text/javascript">
        window.contextPath = "${request.contextPath}";
    </script>
</head>

<body ng-app="webpoint.main" >
<!-- Add your site or application content here -->
<div id="wrap" data-ng-controller="AppController">
    <span us-spinner="{radius:20, width:8, length: 10}" spinner-key="spinner-1"></span>
    <div ng-view=""></div>
</div>
<asset:javascript src="/webpoint/webpoint.main.js"/>
</body>
</html>