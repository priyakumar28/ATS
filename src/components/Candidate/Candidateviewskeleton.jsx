import { Skeleton, Stack } from "@mui/material";

const Candidateviewskeleton = () => {
    return ( 
        <>
         <Stack spacing={1} sx={{display:"flex"}} direction={"row"} mb={2} justifyContent="space-between">
            <Skeleton variant="rounded" sx={{width:"240px",height:"40px"}} />
            <Stack direction={"row"} spacing={1}>
                <Skeleton variant="circular" sx={{width:"40px",height:"40px"}}/>
                <Skeleton variant="circular" sx={{width:"40px",height:"40px"}}/>
                <Skeleton variant="circular" sx={{width:"40px",height:"40px"}}/>
                <Skeleton variant="circular" sx={{width:"40px",height:"40px"}}/>
            </Stack>
        </Stack>
        <Stack spacing={2} >
        <Skeleton variant="rounded" sx={{width:"100%",height:"35px"}}></Skeleton>
        <Skeleton variant="rounded" sx={{width:"100%",height:"35px"}}></Skeleton>
        <Skeleton variant="rounded" sx={{width:"100%",height:"35px"}}></Skeleton>
        <Skeleton variant="rounded" sx={{width:"100%",height:"35px"}}></Skeleton>
        <Skeleton variant="rounded" sx={{width:"100%",height:"35px"}}></Skeleton>
        <Skeleton variant="rounded" sx={{width:"100%",height:"35px"}}></Skeleton>
        <Skeleton variant="rounded" sx={{width:"100%",height:"35px"}}></Skeleton>
        <Skeleton variant="rounded" sx={{width:"100%",height:"35px"}}></Skeleton>
        <Skeleton variant="rounded" sx={{width:"100%",height:"35px"}}></Skeleton>
        <Skeleton variant="rounded" sx={{width:"100%",height:"35px"}}></Skeleton>
        <Skeleton variant="rounded" sx={{width:"100%",height:"35px"}}></Skeleton>
        <Skeleton variant="rounded" sx={{width:"100%",height:"35px"}}></Skeleton>
        <Skeleton variant="rounded" sx={{width:"100%",height:"35px"}}></Skeleton>
        </Stack>
        </>
     );
}
 
export default Candidateviewskeleton;