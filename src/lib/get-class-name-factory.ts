import classnames from 'classnames'

type OptionsObj = Record<string, any> // Object type for options (key-value pairs)
type Options = string | OptionsObj // Options can be a string or an object

export const getGlobalClassName = (rootClass: string, options: Options) => {
  // If options is a string, return rootClass followed by string
  if (typeof options === 'string') {
    return `${rootClass}-${options}`
  } else {
    // If options is an object, map keys with rootClass prefix
    const mappedOptions: Options = {}
    for (const option in options) {
      mappedOptions[`${rootClass}--${option}`] = options[option]
    }

    // Return combined classes using classnames
    return classnames({
      [rootClass]: true,
      ...mappedOptions,
    })
  }
}

// Factory function to create a getClassName function
const getClassNameFactory =
  (
    rootClass: string,
    styles: Record<string, string>, // Styles object (CSS modules)
    config: { baseClass?: string } = { baseClass: '' }, // Optional config with baseClass
  ) =>
  (options: Options = {}) => {
    // Returns a function that generates class names
    if (typeof options === 'string') {
      const descendant = options

      const style = styles[`${rootClass}-${descendant}`]

      if (style) {
        return config.baseClass + styles[`${rootClass}-${descendant}`] || ''
      }

      // If style does not exist, return empty string
      return ''
    } else if (typeof options === 'object') {
      // If options is an object (modifiers)
      const modifiers = options

      // Create object with prefixed modifier classes
      const prefixedModifiers: OptionsObj = {}

      for (const modifier in modifiers) {
        prefixedModifiers[styles[`${rootClass}--${modifier}`]] = modifiers[modifier]
      }

      const c = styles[rootClass]

      return (
        config.baseClass +
        classnames({
          [c]: !!c, // Add root class if it exists
          ...prefixedModifiers, // Spread modifiers
        })
      )
    } else {
      // Fallback: return baseClass + rootClass style
      return config.baseClass + styles[rootClass] || ''
    }
  }

export default getClassNameFactory
