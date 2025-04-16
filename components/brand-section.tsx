/*export function BrandSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-700">Trusted by the world's leading sports brands</h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#f58549] to-[#eda24e] mx-auto mt-4 mb-6 rounded-full"></div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20">
          {[
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            "https://images.unsplash.com/photo-1600185365483-26d84a0a4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            "https://images.unsplash.com/photo-1606107557195-0e29a4b28b9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            "https://images.unsplash.com/photo-1549060279-7e40f0bcc47a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
            "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          ].map((imageUrl, index) => (
            <div key={index} className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-110">
              <img 
                src={imageUrl}
                alt={`Brand ${index + 1}`}
                className="h-10 md:h-12"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

