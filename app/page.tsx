"use client";

import { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

// Helper function to handle paths
const useImagePath = () => {
    const isProduction = process.env.NODE_ENV === 'production';
    return (path: string) => isProduction ? `/SPDE-Gallery${path}` : path;
};

// Image data with descriptions
const GalleryContent = () => {
    const getImagePath = useImagePath();

    const galleryImages = [
        {
            id: 1,
            src: getImagePath('/figures/sascha.png'),
            title: 'Stochastic wave equation with spatially dependent speed',
            equation: '\\partial_{tt}^{2}{u}(t,x)=\\partial_x(\\vartheta\\partial_x)u(t,x) + \\dot{W}(t,x), \\quad t, x \\in [0,1].',
            description: 'The estimation of the wave speed $\\vartheta$ using local measurements is intrinsically related to the energetic behaviour of the wave equation and involves the theory of Riemann-Lebesgue operators. Heatmap with $\\vartheta(z)= \\vartheta_0 \\mathbf{1}_{[0,0.5]}(z)+ \\vartheta_1 \\mathbf{1}_{(0.5,1]}(z),z \\in [0,1].$',
            paperLink: 'https://arxiv.org/abs/2307.05457'
        },
        {
            id: 2,
            src: getImagePath('/figures/anton.png'),
            title: 'Stochastic Allen-Cahn equation with time-varying diffusivity',
            equation: '\\partial_t{X}(t, x) = \\nu(t) \\Delta X(t, x) + \\vartheta(X(t, x))+ \\sigma \\dot{W}(t, x), \\quad t \\in [0,5], x \\in [0,1].',
            description: 'The estimation of the reaction function $\\vartheta$ uses the asymptotic spatial ergodicity of the system as the diffusivity tends to zero and requires Malliavin calculus. Heatmap with $\\vartheta(z) = -4(z^3-16z)$ for $z\\in\\mathbb{R}$, $\\sigma = 1$ and $\\nu(t) = 10^{(-0.6t-2)}$.',
            paperLink: 'https://arxiv.org/pdf/2402.08353.pdf'
        },
        {
            id: 3,
            src: getImagePath('/figures/gregor.png'),
            title: 'Activator component of a stochastic FitzHugh-Nagumo system with mass stabilisation',
            equation: '\\begin{aligned} & \\partial_t U(t,x)=D_U \\Delta U(t,x)+k_1 U(t,x)\\left(u_0-U(t,x)\\right)\\left(U(t,x)-u_0 a[U(t,\\cdot)]\\right)-k_2 V(t,x)+\\dot{W}(t, x) \\\\ & \\partial_t V(t,x)=D_V \\Delta V(t,x)+\\varepsilon(b U(t,x)-V(t,x)), \\quad t,x \\in [0,1]. \\end{aligned}',
            description: 'The estimation of the activator diffusivity turns out to be asymptotically robust under misspecification in the reaction model in the generating equations. This can even encompass the presence or absence of different dynamical features in the observed trajectory.',
            paperLink: 'https://link.springer.com/article/10.1007/s00332-021-09714-4'
        },
        {
            id: 4,
            src: getImagePath('/figures/josef.png'),
            title: 'Stochastic heat equation with multiplicative noise',
            equation: '\\partial_t X(t,x) =\\vartheta \\Delta X(t,x) +\\sigma(X(t,x)) \\dot{W}(t,x), \\quad t,x \\in [0,1].',
            description: 'Under multiplicative noise, the standard local estimator of $\\vartheta$ is asymptotically mixed normal as the resolution becomes finer. This is based on Brownian martingale representation in Hilbert spaces and stable convergence. Weighting by quadratic variation improves the estimator and enjoys asymptotic normality. Heatmap with $\\vartheta = 0.20$, $\\sigma(z) = 0.20 \\times |z|^{0.8} + 0.01$.',
            paperLink: 'https://www.sciencedirect.com/science/article/pii/S0304414924000917'
        },
        {
            id: 5,
            src: getImagePath('/figures/pavel.png'),
            title: 'Stochastic Allen-Cahn equation with noise and space-dependent Hurst parameter',
            equation: '\\left(\\partial_t  - \\nu \\Delta\\right) X(t,x) - \\vartheta(X(t,x)) = \\sigma \\dot{W}^{H(x)}(t,x), \\quad t,x \\in [0,1].',
            description: 'Estimation of the Hurst parameter $H$ in parabolic SPDEs can be based on exploiting the local effect of parabolic spatio-temporal scaling on the probabilistic distribution of the space-time noise via its self-similarity. Heatmap with $H(x) = x$ and $\\vartheta(z)=40 z (1-z)(z-1/2)$.',
            paperLink: ''
        },
        {
            id: 6,
            src: getImagePath('/figures/eric.png'),
            title: 'Stochastic convection-diffusion equation with spatial transport',
            equation: '\\partial_tX(t, x)=(a\\Delta+ \\vartheta\\cdot\\nabla + c)X(t,x)dt +\\dot{W}(t, x), \\quad t,x \\in [0,1].',
            description: 'To estimate the spatially varying transport coefficient of a stochastic convection-diffusion equation, the contribution of different local measurements must be weighted and controlled by a bandwidth to account for bias reduction. Heatmap with $a=0.02$, $c=0.3$ and $\\vartheta(z)=-0.5-3z^2$ for $z \\in [0,1]$.',
            paperLink: 'https://arxiv.org/abs/2404.18823'
        }
    ];

    const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

    // Helper function to wrap equation in display mode
    const DisplayEquation = ({ equation }: { equation: string }) => (
        <div className="equation-container">
            <Latex>{`$$${equation}$$`}</Latex>
        </div>
    );

    // Helper function to process description text
    const Description = ({ text }: { text: string }) => (
        <div className="description-text">
            <Latex>{text}</Latex>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">SPDE Gallery</h1>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
                    Exploring the visual beauty of Stochastic Partial Differential Equations
                </p>
            </header>

            {/* Image Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                {galleryImages.map((img) => (
                    <div
                        key={img.id}
                        className="gallery-card cursor-pointer"
                        onClick={() => setSelectedImage(img)}
                    >
                        <div className="relative h-64 md:h-80">
                            <Image
                                src={img.src}
                                alt={img.title}
                                fill
                                className="gallery-img"
                                style={{ objectFit: 'cover' }}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                quality={30}
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLUEwLi0tLTAtQFBGRjpGQE1NVFBVX19pa3N3c2uDg4ODg4ODg4P/2wBDARUXFyAeIB4gHh4gIiAdIB0gHR0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICD/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                            />
                        </div>
                        <div className="p-4 bg-white dark:bg-gray-800">
                            <h3 className="text-xl font-semibold mb-2">{img.title}</h3>
                            <div className="text-gray-600 dark:text-gray-300 line-clamp-2">
                                <Description text={img.description} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for enlarged image view */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4 overflow-y-auto"
                    onClick={() => setSelectedImage(null)}
                >
                    <div
                        className="relative w-full max-w-[90vw] bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-2xl my-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 z-10 text-gray-800 dark:text-white bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="flex flex-col lg:flex-row">
                            <div className="relative w-full lg:w-[70%] min-h-[60vh] lg:min-h-[80vh]">
                                <Image
                                    src={selectedImage.src}
                                    alt={selectedImage.title}
                                    fill
                                    className="object-contain"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 70vw"
                                    quality={100}
                                    loading="eager"
                                />
                            </div>
                            <div className="p-6 lg:w-[30%] bg-white dark:bg-gray-900 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-800">
                                <div className="modal-content">
                                    <h2 className="modal-title">{selectedImage.title}</h2>
                                    <div className="equation-wrapper">
                                        <DisplayEquation equation={selectedImage.equation} />
                                    </div>
                                    <Description text={selectedImage.description} />
                                    {selectedImage.paperLink && (
                                        <a
                                            href={selectedImage.paperLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="paper-link"
                                        >
                                            View Paper
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function Home() {
    return <GalleryContent />;
} 