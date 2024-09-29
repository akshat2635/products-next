import React, { Component } from 'react'
import Image from 'next/image' // Use next/image for image optimization

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        {/* Use next/image to handle static assets */}
        <Image src="/loading.gif" alt="loading" width={36} height={36} />
      </div>
    )
  }
}

export default Spinner
