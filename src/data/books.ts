import { Book, BookCategory } from "@/types/book";

// 카테고리 데이터
export const categories: BookCategory[] = [
  { id: "development", name: "개발" },
  { id: "literature", name: "문학" },
  { id: "자기계발", name: "자기계발" },
];

// 책 데이터
export const books: Book[] = [
  {
    id: "1",
    title: "소프트웨어 장인",
    author: "산드로 만쿠소",
    publisher: "길벗",
    publishedYear: 2015,
    category: "development",
    coverImage: "/images/books/the-software-craftsman.jpg",
    highlights: [
      {
        chapter: "9장. 인재 채용",
        quotes: [
          {
            text: "p.182 우리는 가족이나 연인보다 회사 동료들과 훨씬 많은 시간을 보낸다. 신뢰할 수 있고 좋은 관계를 맺을 수 있는 사람을 동료로 두는 것은 대단히 중요하다.",
          },
          {
            text: "p.183 지원자들은 항상 주관적으로 평가될 수밖에 없다. 좋은 개발자인지 나쁜 개발자인지가 면접관 개인의 기술적 역량, 가치 기준, 편견에 따라 정해진다. 계층 구조와 통제에 가치를 두는 사람은 자기보다 더 나은 사람, 심지어 자신과 비슷한 수준의 사람조차 배척한다. 반면에 항상 배우기를 원하고 더 나은 일하는 방법을 찾는 사람은 자신보다 훌륭한 사람과 함께 일하기를 원하고 최소한 자신과 비슷한 역량의 사람이라도 채용되기를 희망한다.",
          },
          {
            text: "p.185 최고의 개발자들은 대단히 신중하게 일을 찾는다. 특정 기술의 사용 유무보다 회사의 문화, 업무에서의 책임, 프로젝트의 종류를 훨씬 더 중요하게 여긴다.",
            comments: [
              "채용공고에서 '기술에 대한 열정과 ... 배움을 얻고자 하는 개발자'를 환영한다는 부분이 있다면 뒷받침하는 내용을 직무 요건에서 찾을 수 있어야 한다. 그러한 열정이 어떻게 보상받고 가치를 부여받는지 확인하자.",
            ],
          },
          {
            text: "p.191 훌륭한 개발자들에게 일은 그냥 일이 아니다. 일은 취미이자 열정이다. ... 개발자들은 그들이 빛날 수 있는 기회와 재미난 일거리를 많이 제공해 줄 회사를 찾는다.",
          },
          {
            text: "p.195 많은 개발자들과 이 주제에 대해서 오랫동안 이야기를 나누어 왔지만 그중 단 한번도 특정 기술에 대한 지식이나 경력년수 또는 학위가 훌륭한 개발자의 조건이라고 말하는 사람은 없었다. 그러한 조건들이 훌륭한 개발자와 전혀 상관이 없다면 왜 계속해서 선별 조건으로 내걸어야 할까?",
            comments: [
              "열정이 가장 중요한 요소, 저자 생각에 열정이 있는 개발자라면 다음 중 하나 정도는 해당사항이 있을 것이라 봄. 'Github 계정, 블로그, 오픈 소스 활동, 기술 커뮤니티나 사용자 그룹 활동 내역, 펫 프로젝트 내용, 트위터 계정, 좋아하는 기술서적 목록, 참석했거나 발표했던 콘퍼런스'",
            ],
          },
          {
            text: "p.197 회사는 시급하게 채용해야 하는 상황을 절대 만들어서는 안 된다.",
          },
          {
            text: "p.199 미래의 성공 가능성을 높이기 위해서는 열정적인 개발자를 찾아야 한다. 열정적인 개발자는 개방된 사고로 항상 무언가를 배우기를 원하기 떄문이다. 그들은 스스로 동기가 부여되어 혁신하고 기술 변화를 이끈다. 그들은 누가 무엇을 하라고 할 때까지 기다리지 않는다. 무언가를 시킬 때까지 그저 가만 있는 사람들은 회사를 정체 상태로 이끌어 피해야 할 사람들이다.",
          },
          {
            text: "p.199 회사 입장에서 사내의 개발자들이 마음에 들지 않는다면, 그 개발자들을 탓하는 대신 먼저 회사가 그들을 어떻게 채용했었는지 회사의 채용 방식에 의문을 품어야 한다.",
            comments: [
              "뒤쳐진 일정, 모호한 비즈니스 가치, 상명하복식 관리, 공장 노동자처럼 취급받는 개발자들, 산처럼 쌓인 개발 관련 문서, 아무런 협의없이 그저 통보되는 기술적 결정, 개발자가 고객이나 이해 관계자와 격리된 환경 -> 이러한 프로젝트에서 얻을 수 있는 것은 당황과 분노뿐",
              "개발자 채용 면접은 개발자가 보아야 한다. 관리층과 개발팀 상호 간의 신뢰 수준을 봐라.",
            ],
          },
          {
            text: "p.203 지원자가 얼마나 많은 질문을 하느냐는 면접관 입장에서 그 사람의 협업 능력과 비즈니스 기여 가능성을 가늠할 수 있는 중요한 단서가 된다.",
          },
          {
            text: "p.205 모든 지원자에게 특정 API나 도구, 기술에 대해서 완전히 똑같은 질문을 하는 것은 잘못된 면접 방법이다. 대신 현실 세계의 문제나 아주 구체적인 상황에 대해서 개방적인 대화를 하는 것이 좋다.",
            comments: [
              "가능하다면 같이 코드를 짜보는 것이 지원자의 수준을 가늠하기 위한 최고의 방법이다.",
            ],
          },
          {
            text: "p.221 경험 많고 재능있는 개발자들은 금전적인 보상 수준보다도 자율성, 배움, 생산적인 파트너십, 열정적인 사람들, 좋은 업무 환경과 같은 것들을 더 우선해서 따진다.",
          },
          {
            text: "p.226 시스템 주요 문제가 알고리즘이 아니라면 코딩 면접 때 알고리즘 문제 대신 실제 문제에 가까운 과제를 제시해야 한다. 지원자가 비즈니스 도메인을 표현하고 솔루션을 설계할 역량이 있는지에 집중해야 한다.",
            comments: [
              "면접관 스스로도 할 수 없는 일이나 실제 업무 현장에서 부딪히지 않을 상황을 지원자에게 요구해서는 안된다. 예) 인터넷 X, 종이나 화이트보드 코드 작성",
            ],
          },
        ],
      },
    ],
  },
];

// 카테고리별 책 목록을 가져오는 함수
export const getBooksByCategory = (categoryId: string): Book[] => {
  return books.filter((book) => book.category === categoryId);
};

// 책 ID로 책 정보를 가져오는 함수
export const getBookById = (bookId: string): Book | undefined => {
  return books.find((book) => book.id === bookId);
};
