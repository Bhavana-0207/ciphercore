import OperationsShell from '@/components/operations-shell'
export default async function Page({params}:{params:Promise<{slug:string[]}>}){const {slug}=await params;const path=slug.join('/');return <OperationsShell view={path.startsWith('property/')?'property-detail':path}/>} 
