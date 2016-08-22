<html>
<head>
    <meta charset="UTF-8">
    <title>Contacts</title>
</head>
<body>
<h2>Contacts for {$record.name}</h2>

<ul>
{foreach from=$record.contacts item=contact}
    <li>{$contact.key}, {$contact.value}, {$contact.createdBy}</li>
{/foreach}
</ul>
</body>
</html>