# Widgets

Documentation to make widget components.

**props**: all the components children of Widget received a widget object and an update action.

```
props = {
  widget: PropTypes.shape({
    id: PropTypes.number,
    kind: PropTypes.string,
    settings: PropTypes.object
  }),
  update: PropTypes.func,
  editable: PropTypes.bool
}
```

Connected your widget component to application through the
configuration file in `widgets/config.js`

```
{
  component: Content,
  kind: 'content',
  icon: 'font',
  label: 'Texto',
  settings: {
    content: 'Clique aqui para editar'
  },
  redirect: '/content/edit'  // optional, not render widget overlay if pass this config
}
```
