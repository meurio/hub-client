# MobRender

**Reducers**

- [Widgets](#widgets)

## Reducers

### Widgets

```
{
  isLoaded: false,
  fetching: false,
  saving: false,
  data: [],
  error: undefined
}
```

**isLoaded** set true when complete fetch

**fetching** set true when start request to fetch and false when finish

**saving** set true when start request to save widget and false when
finish

**data** list of widgets loaded in state

**error** failure any request
