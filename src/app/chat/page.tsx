"use client"
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function Page(){
    const router = useRouter();
    function logout() {
        sessionStorage.setItem('id','');
        router.push('/');
    }
    return (
        <main className="flex flex-col items-center min-h-screen w-full p-24 mt-0">
            <header className="w-3/4 mb-8">
                <div className="flex justify-between items-center py-4 px-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    <div>
                        <Link href="/board">
                        <div className="text-lg font-bold hover:underline">글 목록</div>
                        </Link>
                    </div>
                    <div>
                        <button onClick={logout} className="text-lg font-bold hover:underline">로그아웃</button>
                    </div>
                </div>
            </header>
            <div className="bg-white p-8 rounded-lg shadow-md w-3/4 h-[70vh] ">
                <div className="pl-5 pt-3 h-5/6 overflow-auto w-5/6 ring-black ring-opacity-15 ring-1">
                    <b className="mr-3">chatname :</b> hello?
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed ex ac elit venenatis facilisis. Vestibulum vel vestibulum eros. In hac habitasse platea dictumst. Integer quis mi in ex laoreet eleifend sed nec risus. In suscipit justo ac turpis hendrerit, ut eleifend risus convallis. Maecenas auctor ultrices libero, nec fringilla elit. Aliquam tempus vehicula turpis, nec gravida urna condimentum et. Aliquam fringilla, ligula sed vulputate tincidunt, dolor turpis fermentum eros, vel vehicula sapien enim id leo. Cras faucibus tincidunt suscipit. Proin vel enim ultricies, commodo nulla eget, dignissim eros. Donec convallis, mauris et vehicula ultrices, odio sapien efficitur enim, eu feugiat urna velit vitae justo.

                        Vivamus eu tellus vitae ante consectetur posuere. Maecenas sodales, sapien sed fermentum hendrerit, justo enim condimentum felis, ac tincidunt sapien nulla non lectus. Sed lobortis, enim vitae aliquet mattis, purus tellus efficitur orci, sit amet dictum justo odio sed ligula. Aliquam sit amet ex quis magna scelerisque egestas. Phasellus interdum lectus nec vestibulum scelerisque. Mauris vitae fermentum nunc, sit amet placerat lacus. Vestibulum at felis quis magna consequat posuere. Nulla facilisi. Mauris vel consectetur nunc, nec varius neque. Integer vehicula eleifend neque, a tincidunt libero scelerisque nec. Vivamus ut est vitae magna eleifend vulputate. Nullam eu arcu et libero suscipit aliquet.

                        Sed ac vehicula mauris. Proin pharetra neque nec semper condimentum. Curabitur convallis dui id ultricies hendrerit. Mauris vestibulum augue nec magna malesuada venenatis. Fusce pharetra, magna vel vestibulum scelerisque, ipsum orci ultrices magna, id rhoncus quam justo eu sem. Nulla auctor magna eget mauris dapibus, ac commodo nisi elementum. Aliquam sodales nisi a velit feugiat, nec vestibulum purus fermentum. Fusce ut massa nec mi rutrum facilisis. Nullam a risus vel risus fermentum venenatis.

                        Pellentesque ut aliquet lacus, ut malesuada eros. Duis sodales, odio quis dapibus efficitur, nunc ex commodo risus, sed posuere libero ex nec orci. Integer maximus laoreet ex, eget tincidunt ex hendrerit sed. Nullam nec odio at nunc tincidunt vehicula. Integer at purus ut nisi gravida vulputate. Nam commodo, felis in rhoncus viverra, risus metus vulputate ligula, ac pharetra sem nisl eu justo. Curabitur vitae dolor sed ligula volutpat interdum. Nulla a mi ac purus laoreet tempor nec ac turpis. Vestibulum laoreet vehicula arcu a dapibus. Integer nec ligula sit amet enim fermentum efficitur vitae eget velit. Donec fringilla ex quis mauris malesuada, in sollicitudin sapien malesuada.

                        Etiam volutpat quam a mollis ullamcorper. Maecenas quis fermentum justo. Suspendisse nec velit vitae libero eleifend facilisis nec ac risus. Sed interdum nisl auctor libero malesuada, vel sodales justo tincidunt. Donec eu diam eget eros commodo commodo. Curabitur eget velit est. Proin non libero et urna facilisis placerat. Morbi dapibus odio id vehicula vestibulum.

                        Integer rutrum posuere justo nec lacinia. Curabitur quis dolor id erat finibus blandit eget ac mauris. Vivamus congue augue at tempor cursus. Nullam quis mauris in tortor efficitur blandit. In hac habitasse platea dictumst. In commodo enim a tellus convallis varius. Proin nec purus at mi vehicula rutrum. Mauris fermentum, felis nec gravida feugiat, justo mi varius eros, sed ultricies magna nisl non lectus. Duis aliquet mauris eget aliquet fermentum. Mauris at quam sed orci efficitur congue. Nulla facilisi. Donec gravida quam et ipsum vehicula, eget fermentum dolor euismod.

                        Vestibulum consectetur eros sit amet feugiat pharetra. Curabitur sed nibh nisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras vulputate urna at sapien vestibulum, nec lobortis ipsum viverra. Suspendisse aliquam, libero ac tincidunt faucibus, ligula magna faucibus tortor, in eleifend enim ligula vel nunc. Cras vehicula purus nec elit dignissim aliquet. Curabitur posuere leo a nibh vehicula aliquam. Nullam non tellus non nisi volutpat posuere. Mauris vehicula nunc sit amet sodales laoreet. Vestibulum vel aliquet sapien, non auctor libero. Nulla facilisi. Curabitur blandit tellus nec velit ultricies, at egestas quam vestibulum. Donec vehicula euismod purus in maximus. Phasellus et velit quam. Fusce id justo vel ligula pharetra gravida nec eu odio. Nam ut tortor id ipsum rutrum fermentum.
                    </p>
                </div>
                <div className="flex h-8">
                    <input
                        id="message"
                        name="message"
                        className="pl-4 placeholder:italic border border-slate-300 w-full mt-5 h-full rounded-lg"
                        type="text"
                        placeholder="보낼 내용을 입력하세요"
                    />
                    <button
                        type="submit"
                        className="h-full w-1/6 text-center text-sm bg-gradient-to-r from-purple-500 to-pink-500 ml-3 rounded-lg mt-5 font-bold text-white"
                    >전송</button>
                </div>
            </div>
        </main>
    );
}