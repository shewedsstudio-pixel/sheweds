import { getProducts } from '@/lib/db';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { removeProduct } from '@/app/actions/product-actions';
import Link from 'next/link';
import Image from 'next/image';

export default async function AdminDashboard() {
    const products = await getProducts();

    return (
        <div className="pt-24 pb-20 min-h-screen bg-stone-50">
            <Container>
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-serif font-bold">Admin Dashboard</h1>
                    <div className="flex gap-4">
                        <Link href="/admin/hero">
                            <Button className="bg-purple-600 text-white hover:bg-purple-700">Manage Hero Slides</Button>
                        </Link>
                        <Link href="/admin/design">
                            <Button className="bg-[#3C1E10] text-white hover:bg-[#5C2E18]">Customize Website</Button>
                        </Link>
                        <Link href="/admin/dashboard/new">
                            <Button>Add New Product</Button>
                        </Link>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="relative h-12 w-12">
                                            <Image src={product.images?.[0] || '/placeholder.jpg'} alt={product.name} fill className="object-cover rounded" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{product.price}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link href={`/admin/dashboard/edit/${product.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</Link>
                                        <form action={removeProduct.bind(null, product.id)} className="inline">
                                            <button className="text-red-600 hover:text-red-900">Delete</button>
                                        </form>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Container>
        </div>
    );
}
