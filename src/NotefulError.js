import React from 'react'

class NotefulError extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      console.log(error, 'from state')
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      //logErrorToMyService(error, errorInfo);
      console.log(error, errorInfo, 'from componentDidCatch')
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        console.log(this.state.hasError)
        return <h1>Something went wrong.</h1>;
      }
      return this.props.children; 
    }
  }

  export default NotefulError