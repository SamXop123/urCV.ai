import { FileText, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-2xl font-bold">N-PCs</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                            Building the future of computing solutions
                        </p>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact</h3>
                        <p className="text-gray-400 text-sm mb-2">Email: neelpandeyofficial@gmail.com</p>
                    </div>

                    {/* Project Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Project</h3>
                        <p className="text-gray-400 text-sm mb-2">Developed under AcWoc 2026 initiative</p>
                    </div>

                    {/* Quick Links Section */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Support</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Documentation</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-sm font-semibold mb-2">Connect With Us</h3>
                            <div className="flex space-x-4">
                                <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Minimalist Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
                    <p>
                        © 2026 N-PCs | neelpandeyofficial@gmail.com | AcWoc 2026 Project | Privacy Policy | Terms of Service
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
