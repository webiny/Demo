<html>
<head>
    <meta charset="UTF-8">
    <title>Records</title>
</head>
<body>
<h2>Records export</h2>

<ul>
{foreach from=$records item=r}
    <li>{$r.id} - {$r.name} {$r.email}</li>
{/foreach}
</ul>
</body>
</html>