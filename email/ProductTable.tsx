import formatCurrency from "@/lib/formatCurrency";
import { Section, Heading, Text, Img } from "@react-email/components";

export default function ProductTable({
  order,
}: {
  order: { title: string; quantity: number; image: string; price: number }[];
}) {
  return (
    <Section className="py-[16px] text-center">
      <Heading
        as="h1"
        className="mb-0  text-[30px] font-semibold leading-[36px]"
      >
        Order recieved successfully
      </Heading>
      <Section className="my-[16px] rounded-[8px] border border-solid border-gray-200 p-[16px] pt-0">
        <table className="mb-[16px]" width="100%">
          <tr>
            <th className="border-0 border-b border-solid border-gray-200 py-[8px]">
              &nbsp;
            </th>
            <th
              align="left"
              className="border-0 border-b border-solid border-gray-200 py-[8px] text-gray-500"
              colSpan={6}
            >
              <Text className="font-semibold">Product</Text>
            </th>
            <th
              align="center"
              className="border-0 border-b border-solid border-gray-200 py-[8px] text-gray-500"
            >
              <Text className="font-semibold">Quantity</Text>
            </th>
            <th
              align="center"
              className="border-0 border-b border-solid border-gray-200 py-[8px] text-gray-500"
            >
              <Text className="font-semibold">Price</Text>
            </th>
          </tr>
          {order?.map((ord, i) => <TableRow key={i} ord={ord} />)}
        </table>
      </Section>
    </Section>
  );
}

function TableRow({
  ord,
}: {
  ord: { title: string; quantity: number; image: string; price: number };
}) {
  return (
    <tr>
      <td className="border-0 border-b border-solid border-gray-200 py-[8px]">
        <Img
          alt={ord.title}
          className="rounded-[8px] object-cover"
          height={110}
          src={ord.image}
        />
      </td>
      <td
        align="left"
        className="border-0 border-b border-solid border-gray-200 py-[8px]"
        colSpan={6}
      >
        <Text>{ord.title}</Text>
      </td>
      <td
        align="center"
        className="border-0 border-b border-solid border-gray-200 py-[8px]"
      >
        <Text>{ord.quantity}</Text>
      </td>
      <td
        align="center"
        className="border-0 border-b border-solid border-gray-200 py-[8px]"
      >
        <Text>{formatCurrency(ord.price)}</Text>
      </td>
    </tr>
  );
}
