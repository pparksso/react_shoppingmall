import axios from "axios";

const RemoveCart = ({ no, token }) => {
  const deleteItem = () => {
    axios({
      method: "POST",
      url: `http://localhost:8080/cart/del`,
      withCredentials: true,
      data: {
        no,
        token,
      },
    })
      .then((res) => {
        if (res.data.delete) return console.log("ok");
        else return alert("장바구니에서 상품을 제거하지 못했습니다.");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <li>
      <button onClick={deleteItem}>
        <span>삭제</span>
      </button>
    </li>
  );
};

export default RemoveCart;
