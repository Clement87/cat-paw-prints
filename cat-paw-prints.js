/**
 * Cat Paw Prints Trail
 * A simple library that creates cat paw prints that follow the mouse cursor
 * @version 1.0.0
 */

class CatPawPrints {
  constructor(options = {}) {
    this.pawPrints = []
    this.pawId = 0
    this.lastPawTime = 0
    this.lastPawX = 0
    this.lastPawY = 0
    this.stepCounter = 0
    this.cleanupInterval = null
    this.container = null
    
    // Configuration options
    this.config = {
      color: options.color || '#6B7280', // Gray color by default
      maxPaws: options.maxPaws || 4, // Maximum number of visible paw prints
      fadeOutDuration: options.fadeOutDuration || 2000, // Fade out duration in ms
      spawnInterval: options.spawnInterval || 10, // Minimum time between spawns in ms
      spawnDistance: options.spawnDistance || 30, // Minimum distance to spawn new paw in px
      zIndex: options.zIndex || 9999 // Z-index of the container
    }
  }

  /**
   * Cat walking pattern: Front-Left -> Back-Right -> Front-Right -> Back-Left
   */
  getPawType(step) {
    const patterns = [
      { isLeft: true, isFront: true },   // Front-Left
      { isLeft: false, isFront: false }, // Back-Right  
      { isLeft: false, isFront: true },  // Front-Right
      { isLeft: true, isFront: false }   // Back-Left
    ]
    return patterns[step % 4]
  }

  /**
   * Create the SVG paw print element
   */
  createPawElement(x, y, angle, isLeft) {
    const pawDiv = document.createElement('div')
    pawDiv.className = 'cat-paw-print'
    pawDiv.style.cssText = `
      position: absolute;
      left: ${x - 15}px;
      top: ${y - 15}px;
      opacity: 0.8;
      filter: drop-shadow(0 0 2px rgba(0,0,0,0.5));
      transition: opacity 0.1s ease-out;
      user-select: none;
      pointer-events: none;
      transform: rotate(${angle}deg) scaleX(${isLeft ? -1 : 1});
      transform-origin: center center;
    `
    
    pawDiv.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 1280 1280" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
           fill="${this.config.color}" 
           stroke="none">
          <path d="M4615 12476 c-167 -39 -293 -112 -436 -255 -116 -115 -199 -232 -279
          -391 -477 -954 -316 -2528 353 -3430 91 -123 249 -285 357 -366 354 -267 752
          -281 1071 -38 327 250 551 732 636 1369 21 164 25 672 5 840 -82 702 -291
          1283 -618 1722 -82 109 -243 273 -344 350 -94 71 -272 163 -365 188 -83 23
          -302 29 -380 11z"/>
          <path d="M8546 12274 c-311 -61 -636 -299 -905 -661 -346 -465 -580 -1080
          -668 -1758 -28 -216 -25 -698 5 -894 70 -447 219 -789 442 -1011 191 -192 431
          -281 675 -252 581 72 1154 706 1460 1616 254 755 281 1550 73 2156 -203 591
          -615 897 -1082 804z"/>
          <path d="M2095 9010 c-409 -65 -717 -395 -856 -919 -79 -301 -90 -716 -28
          -1081 143 -850 635 -1631 1217 -1933 298 -154 595 -181 850 -75 376 156 623
          560 704 1153 16 119 16 472 -1 610 -130 1102 -809 2069 -1564 2230 -89 19
          -247 26 -322 15z"/>
          <path d="M10570 8200 c-360 -77 -713 -330 -1006 -722 -318 -426 -532 -982
          -594 -1542 -16 -146 -13 -460 5 -601 122 -948 766 -1403 1495 -1059 391 185
          745 566 998 1073 480 960 449 2085 -73 2606 -220 220 -523 310 -825 245z"/>
          <path d="M6225 6421 c-662 -118 -1497 -813 -2237 -1861 -579 -821 -987 -1705
          -1109 -2405 -29 -168 -32 -468 -6 -583 41 -179 110 -297 244 -422 224 -207
          493 -329 830 -376 175 -24 529 -15 754 19 301 47 555 108 1124 272 550 158
          704 191 856 181 193 -13 338 -60 754 -243 298 -131 464 -193 606 -228 530
          -128 976 39 1435 537 137 148 179 220 222 377 24 90 26 110 26 321 0 191 -3
          245 -23 355 -118 667 -469 1473 -976 2240 -603 912 -1311 1569 -1902 1764
          -215 71 -398 87 -598 52z"/>
        </g>
      </svg>
    `
    
    return pawDiv
  }

  /**
   * Handle mouse movement
   */
  handleMouseMove(e) {
    const now = Date.now()
    const clientX = e.clientX || e.pageX
    const clientY = e.clientY || e.pageY
    const distance = Math.sqrt(
      Math.pow(clientX - this.lastPawX, 2) + 
      Math.pow(clientY - this.lastPawY, 2)
    )

    // Only create paw if enough time passed and mouse moved enough
    if (now - this.lastPawTime > this.config.spawnInterval && 
        distance > this.config.spawnDistance) {
      
      // Calculate movement angle
      const deltaX = clientX - this.lastPawX
      const deltaY = clientY - this.lastPawY
      const angleRad = Math.atan2(deltaY, deltaX)
      const angle = angleRad * (180 / Math.PI) + 90
      
      // Perpendicular vector to movement direction
      const perpX = -Math.sin(angleRad)
      const perpY = Math.cos(angleRad)
      
      // Get current paw type from walking pattern
      const currentPaw = this.getPawType(this.stepCounter)
      
      // Add small random variation
      const randomVariation = () => (Math.random() - 0.5) * 8

      const pawOffset = 16
      const frontPawDistance = 5 + randomVariation()
      const backPawDistance = 55 + randomVariation()
      const behindOffset = currentPaw.isFront ? frontPawDistance : backPawDistance
      
      // Calculate final position
      const offsetX = (currentPaw.isLeft ? -pawOffset : pawOffset) * perpX - 
                      behindOffset * Math.cos(angleRad)
      const offsetY = (currentPaw.isLeft ? -pawOffset : pawOffset) * perpY - 
                      behindOffset * Math.sin(angleRad)
      
      const pawX = clientX + offsetX
      const pawY = clientY + offsetY
      
      // Create and add paw element
      const pawElement = this.createPawElement(pawX, pawY, angle, currentPaw.isLeft)
      this.container.appendChild(pawElement)
      
      // Store paw print data
      this.pawPrints.push({
        id: this.pawId++,
        element: pawElement,
        timestamp: now
      })
      
      this.lastPawTime = now
      this.lastPawX = clientX
      this.lastPawY = clientY
      this.stepCounter++
    }
  }

  /**
   * Clean up old paw prints
   */
  cleanup() {
    const now = Date.now()
    this.pawPrints = this.pawPrints.filter(paw => {
      const age = now - paw.timestamp
      
      // Fade out animation
      if (age < this.config.fadeOutDuration) {
        const opacity = Math.max(0, 0.8 - (age / this.config.fadeOutDuration))
        paw.element.style.opacity = opacity
        return true
      } else {
        // Remove element
        if (paw.element.parentNode) {
          paw.element.parentNode.removeChild(paw.element)
        }
        return false
      }
    })
    
    // Keep only the most recent paws
    while (this.pawPrints.length > this.config.maxPaws) {
      const oldPaw = this.pawPrints.shift()
      if (oldPaw.element.parentNode) {
        oldPaw.element.parentNode.removeChild(oldPaw.element)
      }
    }
  }

  /**
   * Initialize the paw prints trail
   */
  init() {
    // Create container element
    this.container = document.createElement('div')
    this.container.id = 'cat-paw-prints-container'
    this.container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: ${this.config.zIndex};
      overflow: hidden;
    `
    document.body.appendChild(this.container)
    
    // Bind the event handler to maintain 'this' context
    this.boundHandleMouseMove = this.handleMouseMove.bind(this)
    
    // Add event listeners
    document.addEventListener('mousemove', this.boundHandleMouseMove, { passive: true })
    document.addEventListener('pointermove', this.boundHandleMouseMove, { passive: true })
    
    // Start cleanup interval
    this.cleanupInterval = setInterval(() => this.cleanup(), 100)
  }

  /**
   * Destroy the paw prints trail and clean up
   */
  destroy() {
    // Remove event listeners
    document.removeEventListener('mousemove', this.boundHandleMouseMove)
    document.removeEventListener('pointermove', this.boundHandleMouseMove)
    
    // Clear interval
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval)
    }
    
    // Remove container
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container)
    }
    
    // Clear arrays
    this.pawPrints = []
  }
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CatPawPrints
}
if (typeof define === 'function' && define.amd) {
  define([], function() { return CatPawPrints })
}
if (typeof window !== 'undefined') {
  window.CatPawPrints = CatPawPrints
}
