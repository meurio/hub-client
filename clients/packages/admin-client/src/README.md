# Bonde (Client)

Application based-on ReactJS

## Architeture module

`~/client`

```
|- mobilizations
|--- redux
|------ action-creators
|------ reducers.js // reducers/
|
|--- components
|------ forms
|------ widget.js
|------ block.js
|------ block-widgets.js
|------ mobilization.js
|------ index.js
|--- README.md
|- widgets  // novo plugins, connected
|--- content
|--- drafteditor
|--- donation
|----- redux
|--- README.md
```

```
|- routes
|--- mobilizations
|------ edit-mobilization.page.js
|------ index.js  // import com a rota
|--- list-mobilizations.page.js
|--- custom-domain.page.js
|--- root.js  // responsável por renderizar custom ou list-mobilizations
```

<Widget /> : <DraftWidget /> : <ContentWidget />

content.connected.js
props = {
  editWidget: 
}

mapStateProps = {
  
}
