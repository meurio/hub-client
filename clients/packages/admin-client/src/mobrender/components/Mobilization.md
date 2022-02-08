### Mobilization

Propriedades:
    
    ```
    Mobilization.propTypes = {  // Render
      // Mobilization props
      editable: PropTypes.bool.isRequired,
      mobilization: PropTypes.object.isRequired,
      blocks: PropTypes.array.isRequired,
      widgets: PropTypes.array.isRequired, 
      // Injected by redux. Refactor?
      blockEditionMode: PropTypes.bool,
      blocksIsLoaded: PropTypes.bool,
      blockUpdate: PropTypes.func.isRequired
    }
    ```

### Navbar

Propriedades:

    ```
    Navbar.propTypes = {
      editable: PropTypes.bool.isRequired,
      mobilization: PropTypes.object.isRequired,
      blocks: PropTypes.array.isRequired,
      blockUpdate: PropTypes.func.isRequired
    }
    ```

### Block

Propriedades:

    ```
    Block.propTypes = {
      editable: PropTypes.bool.isRequired,
      block: PropTypes.object.isRequired,
      widgets: PropTypes.array.isRequired,
      // Injected by redux. Refactor?
      hasMouseOver: PropTypes.bool,
      onMouseOver: PropTypes.func,
      onMouseOut: PropTypes.func,
      onCancelEdit: PropTypes.func,
      editing: PropTypes.string,
      saving: PropTypes.bool
    }
    ```

### Widget

Propriedades:

    ```
    Widget.propTypes = {
      editable: PropTypes.bool.isRequired,
      mobilization: PropTypes.object,
      widget: PropTypes.object.isRequired,
      // Injected by redux. Refactor ?
      update: PropTypes.func.isRequired,
      saving: PropTypes.bool
    }
    ```
