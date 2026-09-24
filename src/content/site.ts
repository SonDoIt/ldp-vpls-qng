/**
 * Every word, number and image path on the site lives here.
 * Sample content (names, reviews, figures, contact details) is marked "MẪU" and must be replaced
 * with the office's real information before launch. Images come from the Lorenza reference
 * template and are placeholders too: swap the file in /public/images or change the path here.
 */

export const office = {
  fullName: "Văn phòng Thi hành án dân sự Doanh nghiệp tư nhân Quảng Ngãi",
  name: "Văn phòng Thi hành án dân sự Quảng Ngãi",
  shortName: "Văn phòng THADS Quảng Ngãi",
  slogan: "Tận tâm trong từng giải pháp",
  // MẪU: replace with the office's real contact details.
  phone: "0255 000 0000",
  phoneHref: "tel:+842550000000",
  email: "lienhe@tenmien.vn",
  address: "Số 00 Đường ABC, Phường XYZ, Tỉnh Quảng Ngãi",
  hours: "Thứ 2 – Thứ 6: 7h30 – 17h00 · Thứ 7: 7h30 – 11h30",
  timing: "7h30 – 17h00",
  award: { years: "2022 – 2026", title: "Văn phòng tiêu biểu" },
  socials: [
    { label: "Facebook", href: "#", icon: "facebook" },
    { label: "Zalo", href: "#", icon: "zalo" },
    { label: "YouTube", href: "#", icon: "youtube" },
  ],
} as const;

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Trang chủ", href: "/" },
  { label: "Vụ việc tiêu biểu", href: "/vu-viec" },
  { label: "Đội ngũ", href: "/doi-ngu" },
];

/** The "Trang" dropdown in the header, same role as "Pages" in the reference. */
export const pagesNav: NavItem[] = [
  { label: "Giới thiệu", href: "/gioi-thieu" },
  { label: "Dịch vụ", href: "/dich-vu" },
  { label: "Liên hệ", href: "/lien-he" },
  { label: "Chính sách bảo mật", href: "/chinh-sach-bao-mat" },
  { label: "Điều khoản sử dụng", href: "/dieu-khoan" },
];

export const footerNav = {
  pages: [
    { label: "Trang chủ", href: "/" },
    { label: "Giới thiệu", href: "/gioi-thieu" },
    { label: "Đội ngũ", href: "/doi-ngu" },
    { label: "Dịch vụ", href: "/dich-vu" },
    { label: "Vụ việc tiêu biểu", href: "/vu-viec" },
  ],
  more: [
    { label: "Liên hệ", href: "/lien-he" },
    { label: "Chính sách bảo mật", href: "/chinh-sach-bao-mat" },
    { label: "Điều khoản sử dụng", href: "/dieu-khoan" },
  ],
};

export const highlights = [
  "Thi hành án đúng pháp luật",
  "Minh bạch chi phí",
  "Tận tâm với đương sự",
  "Phản hồi trong 24 giờ",
  "Bảo mật thông tin",
];

// MẪU: confirm every figure before launch.
export const stats = [
  { value: "10+", label: "Năm kinh nghiệm" },
  { value: "98%", label: "Hồ sơ hoàn tất đúng hạn" },
  { value: "2.000+", label: "Vụ việc đã xử lý" },
];

export const checklist = [
  "Tập trung vào kết quả thực chất",
  "Sẵn sàng cho hồ sơ phức tạp",
  "Rõ ràng, nhanh chóng ở từng bước",
];

export type Service = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  overview: string[];
  reasons: string[];
  approach: string[];
  quote: { text: string; author: string };
};

export const services: Service[] = [
  {
    slug: "to-chuc-thi-hanh-an",
    title: "Tổ chức thi hành án theo yêu cầu",
    summary: "Thi hành bản án, quyết định của Tòa án nhanh chóng, đúng trình tự pháp luật.",
    image: "/images/services/service-1.webp",
    overview: [
      "Bản án có hiệu lực chỉ thực sự có ý nghĩa khi được thi hành. Văn phòng tiếp nhận yêu cầu của đương sự và tổ chức thi hành bản án, quyết định dân sự theo đúng trình tự luật định.",
      "Chấp hành viên của Văn phòng trực tiếp xây dựng kế hoạch, làm việc với các bên liên quan và theo sát hồ sơ từ khi tiếp nhận đến khi kết thúc việc thi hành.",
      "Mỗi bước đều được thông báo rõ ràng để người yêu cầu nắm được tiến độ và chủ động trong việc bảo vệ quyền lợi của mình.",
    ],
    reasons: [
      "Am hiểu sâu quy trình thi hành án dân sự",
      "Kế hoạch thi hành cụ thể, có mốc thời gian",
      "Chi phí minh bạch, thỏa thuận trước",
      "Cập nhật tiến độ thường xuyên",
      "Đồng hành đến khi hồ sơ hoàn tất",
    ],
    approach: [
      "Chúng tôi bắt đầu bằng việc nghiên cứu kỹ bản án, quyết định và điều kiện thực tế của người phải thi hành án để lựa chọn biện pháp phù hợp nhất.",
      "Trong suốt quá trình, Văn phòng ưu tiên thỏa thuận tự nguyện giữa các bên; chỉ áp dụng biện pháp cưỡng chế khi thật sự cần thiết và đúng quy định.",
    ],
    quote: {
      text: "Hồ sơ kéo dài nhiều năm của gia đình tôi đã được giải quyết dứt điểm. Mỗi bước đều được giải thích rõ ràng, chúng tôi rất yên tâm.",
      author: "Anh Minh & chị Lan",
    },
  },
  {
    slug: "xac-minh-dieu-kien-thi-hanh-an",
    title: "Xác minh điều kiện thi hành án",
    summary: "Xác minh tài sản, thu nhập và điều kiện thi hành án của người phải thi hành án.",
    image: "/images/services/service-2.webp",
    overview: [
      "Xác minh điều kiện thi hành án là bước quan trọng quyết định hiệu quả của việc thi hành. Văn phòng tiến hành xác minh tài sản, thu nhập, tài khoản và các điều kiện khác của người phải thi hành án.",
      "Kết quả xác minh được lập thành văn bản, làm căn cứ để đương sự lựa chọn phương án tiếp theo một cách chủ động.",
    ],
    reasons: [
      "Quy trình xác minh chặt chẽ, khách quan",
      "Phối hợp hiệu quả với cơ quan, tổ chức liên quan",
      "Kết quả rõ ràng, có giá trị pháp lý",
      "Bảo mật tuyệt đối thông tin hồ sơ",
    ],
    approach: [
      "Chúng tôi lập danh mục thông tin cần xác minh ngay từ đầu, xác định nguồn và thời hạn để tránh bỏ sót.",
      "Kết quả được tổng hợp kèm đề xuất cụ thể, giúp người yêu cầu có đủ thông tin trước khi ra quyết định.",
    ],
    quote: {
      text: "Nhờ kết quả xác minh đầy đủ, chúng tôi biết chính xác nên làm gì tiếp theo. Rất chuyên nghiệp.",
      author: "Một doanh nghiệp tại Quảng Ngãi",
    },
  },
  {
    slug: "tong-dat-giay-to",
    title: "Tống đạt giấy tờ, văn bản",
    summary: "Tống đạt văn bản của Tòa án, cơ quan thi hành án đúng thời hạn và thủ tục.",
    image: "/images/services/service-3.jpg",
    overview: [
      "Tống đạt đúng và kịp thời là điều kiện để các thủ tục tố tụng, thi hành án được tiến hành hợp lệ. Văn phòng thực hiện tống đạt giấy tờ, hồ sơ, tài liệu theo đúng quy định.",
      "Mọi lần tống đạt đều được ghi nhận đầy đủ, có biên bản và báo cáo kết quả gửi cơ quan yêu cầu.",
    ],
    reasons: [
      "Đúng thời hạn, đúng thủ tục",
      "Biên bản tống đạt đầy đủ, rõ ràng",
      "Phủ khắp địa bàn tỉnh Quảng Ngãi",
      "Báo cáo kết quả nhanh chóng",
    ],
    approach: [
      "Mỗi văn bản được tiếp nhận, phân loại và giao cho thư ký nghiệp vụ phụ trách địa bàn để rút ngắn thời gian.",
      "Trường hợp không tống đạt trực tiếp được, chúng tôi thực hiện niêm yết, thông báo theo đúng quy định.",
    ],
    quote: {
      text: "Tống đạt nhanh, biên bản chuẩn chỉnh. Chúng tôi yên tâm hợp tác lâu dài.",
      author: "Chị Thu Hà",
    },
  },
  {
    slug: "lap-vi-bang",
    title: "Lập vi bằng",
    summary: "Ghi nhận sự kiện, hành vi có thật làm chứng cứ trong giao dịch và tranh chấp.",
    image: "/images/services/service-4.jpg",
    overview: [
      "Vi bằng ghi nhận sự kiện, hành vi có thật do Văn phòng trực tiếp chứng kiến, là nguồn chứng cứ để Tòa án xem xét khi giải quyết vụ việc.",
      "Chúng tôi lập vi bằng cho giao nhận tiền, tài sản, hiện trạng nhà đất, công trình, thông báo, cảnh báo và nhiều sự kiện khác theo yêu cầu.",
    ],
    reasons: [
      "Có mặt nhanh, kể cả ngoài giờ hành chính",
      "Vi bằng rõ ràng, đầy đủ hình ảnh, tài liệu",
      "Tư vấn phạm vi lập vi bằng phù hợp",
      "Lưu trữ an toàn, cấp bản sao khi cần",
    ],
    approach: [
      "Trước khi lập vi bằng, chúng tôi trao đổi kỹ mục đích sử dụng để ghi nhận đúng và đủ những gì cần làm chứng cứ.",
      "Vi bằng được đăng ký theo quy định và bàn giao cho người yêu cầu trong thời gian sớm nhất.",
    ],
    quote: {
      text: "Vi bằng hiện trạng nhà đã giúp chúng tôi bảo vệ quyền lợi khi xảy ra tranh chấp với bên thuê.",
      author: "Ông Trần Quang",
    },
  },
  {
    slug: "ke-bien-xu-ly-tai-san",
    title: "Kê biên, xử lý tài sản",
    summary: "Kê biên, định giá và xử lý tài sản để bảo đảm quyền lợi của người được thi hành án.",
    image: "/images/services/service-5.jpg",
    overview: [
      "Khi người phải thi hành án không tự nguyện thi hành, Văn phòng tổ chức kê biên, thẩm định giá và xử lý tài sản theo đúng trình tự pháp luật.",
      "Quá trình được thực hiện công khai, có sự chứng kiến của các bên liên quan và chính quyền địa phương.",
    ],
    reasons: [
      "Tuân thủ nghiêm trình tự cưỡng chế",
      "Phối hợp chặt chẽ với chính quyền địa phương",
      "Định giá, bán đấu giá minh bạch",
      "Bảo đảm an toàn trong quá trình thực hiện",
    ],
    approach: [
      "Chúng tôi luôn ưu tiên vận động, thuyết phục trước khi áp dụng biện pháp cưỡng chế.",
      "Mỗi cuộc kê biên đều có kế hoạch chi tiết, phương án bảo đảm an toàn và được lập biên bản đầy đủ.",
    ],
    quote: {
      text: "Việc kê biên được tổ chức chặt chẽ, đúng luật và rất chuyên nghiệp.",
      author: "Ngân hàng TMCP (chi nhánh Quảng Ngãi)",
    },
  },
  {
    slug: "tu-van-thi-hanh-an",
    title: "Tư vấn pháp lý thi hành án",
    summary: "Tư vấn quyền, nghĩa vụ và phương án tối ưu trước khi yêu cầu thi hành án.",
    image: "/images/services/service-6.jpg",
    overview: [
      "Không phải ai cũng nắm rõ quyền và nghĩa vụ của mình trong thi hành án. Văn phòng tư vấn cho người được thi hành án, người phải thi hành án và người có quyền lợi liên quan.",
      "Buổi tư vấn giúp bạn hiểu rõ thời hiệu, thủ tục, chi phí và phương án phù hợp nhất với hồ sơ của mình.",
    ],
    reasons: [
      "Tư vấn ban đầu miễn phí",
      "Ngôn ngữ dễ hiểu, đi thẳng vào vấn đề",
      "Phương án cụ thể cho từng hồ sơ",
      "Bảo mật tuyệt đối thông tin",
    ],
    approach: [
      "Chúng tôi lắng nghe câu chuyện của bạn, xem xét giấy tờ hiện có và chỉ ra những điểm cần lưu ý ngay.",
      "Sau buổi tư vấn, bạn nhận được lộ trình rõ ràng để tự quyết định có tiếp tục cùng Văn phòng hay không.",
    ],
    quote: {
      text: "Buổi tư vấn giúp tôi hiểu rõ mình cần làm gì, không còn lo lắng như trước.",
      author: "Chị Ngọc Anh",
    },
  },
];

/** Chips in the "Lĩnh vực" marquee; icons are /public/images/icons/area-N.svg. */
export const focusAreas = [
  { label: "Tranh chấp thương mại", icon: 1 },
  { label: "Doanh nghiệp", icon: 2 },
  { label: "Hợp đồng & giao dịch", icon: 3 },
  { label: "Lao động", icon: 4 },
  { label: "Hôn nhân & thừa kế", icon: 5 },
  { label: "Đất đai & nhà ở", icon: 6 },
  { label: "Bồi thường thiệt hại", icon: 7 },
  { label: "Tín dụng ngân hàng", icon: 8 },
  { label: "Thu hồi nợ", icon: 9 },
  { label: "Giấy tờ & tống đạt", icon: 10 },
  { label: "Sở hữu trí tuệ", icon: 11 },
];

export type Member = {
  slug: string;
  name: string;
  role: string;
  image: string;
  intro: string;
  leadTitle: string;
  lead: string;
  experience: string;
  quote: string;
  skills: string[];
};

// MẪU: sample team, replace names, roles, photos and bios.
export const team: Member[] = [
  {
    slug: "nguyen-van-an",
    name: "Nguyễn Văn An",
    role: "Trưởng Văn phòng",
    image: "/images/team/member-1.webp",
    intro: "Trưởng Văn phòng, chấp hành viên nhiều năm kinh nghiệm trong tổ chức thi hành án dân sự.",
    leadTitle: "Người dẫn dắt tận tâm",
    lead: "Ông An có nhiều năm công tác trong lĩnh vực thi hành án dân sự trước khi thành lập Văn phòng. Ông trực tiếp phụ trách các hồ sơ phức tạp và định hướng chuyên môn cho toàn bộ đội ngũ.",
    experience: "Ông đã tổ chức thi hành thành công nhiều hồ sơ có giá trị lớn liên quan đến tín dụng, đất đai và kinh doanh thương mại. Phong cách làm việc của ông là chắc chắn, rõ ràng và luôn đặt quyền lợi hợp pháp của đương sự lên hàng đầu.",
    quote: "Một bản án chỉ có giá trị khi được thi hành. Việc của chúng tôi là biến quyết định trên giấy thành kết quả thực tế.",
    skills: ["Tổ chức thi hành án", "Kê biên, xử lý tài sản", "Tín dụng ngân hàng", "Tranh chấp đất đai"],
  },
  {
    slug: "tran-thi-binh",
    name: "Trần Thị Bình",
    role: "Chấp hành viên",
    image: "/images/team/member-2.webp",
    intro: "Chấp hành viên phụ trách các hồ sơ hôn nhân gia đình và thừa kế.",
    leadTitle: "Thấu hiểu và kiên nhẫn",
    lead: "Bà Bình chuyên xử lý các hồ sơ liên quan đến hôn nhân gia đình, cấp dưỡng và chia tài sản — những vụ việc cần sự tinh tế và kiên nhẫn.",
    experience: "Bà luôn ưu tiên đối thoại, giúp các bên đạt được thỏa thuận tự nguyện, giảm tối đa căng thẳng cho gia đình.",
    quote: "Mỗi hồ sơ là một câu chuyện của một gia đình. Tôi muốn khép lại câu chuyện ấy một cách êm thấm nhất.",
    skills: ["Hôn nhân & gia đình", "Cấp dưỡng", "Chia tài sản", "Thừa kế"],
  },
  {
    slug: "le-hoang-mai",
    name: "Lê Hoàng Mai",
    role: "Chấp hành viên",
    image: "/images/team/member-3.webp",
    intro: "Chấp hành viên phụ trách các hồ sơ doanh nghiệp và kinh doanh thương mại.",
    leadTitle: "Chuyên sâu về doanh nghiệp",
    lead: "Bà Mai phụ trách các hồ sơ thi hành án liên quan đến doanh nghiệp, hợp đồng thương mại và thu hồi nợ.",
    experience: "Với nền tảng pháp lý doanh nghiệp vững chắc, bà giúp khách hàng tổ chức thu hồi nợ hiệu quả, đúng luật và giữ gìn quan hệ kinh doanh.",
    quote: "Doanh nghiệp cần tốc độ và sự chắc chắn. Tôi làm việc để mang lại cả hai.",
    skills: ["Kinh doanh thương mại", "Thu hồi nợ", "Hợp đồng", "Doanh nghiệp"],
  },
  {
    slug: "pham-quoc-cuong",
    name: "Phạm Quốc Cường",
    role: "Chấp hành viên",
    image: "/images/team/member-4.webp",
    intro: "Chấp hành viên phụ trách kê biên, định giá và xử lý tài sản.",
    leadTitle: "Chặt chẽ trong từng bước",
    lead: "Ông Cường phụ trách các hồ sơ có áp dụng biện pháp cưỡng chế, kê biên và xử lý tài sản.",
    experience: "Ông nổi bật với khả năng lập kế hoạch chi tiết và phối hợp tốt với chính quyền địa phương, bảo đảm mọi cuộc cưỡng chế diễn ra an toàn và đúng luật.",
    quote: "Cưỡng chế là biện pháp cuối cùng, nhưng khi cần thì phải làm đúng và làm đến nơi.",
    skills: ["Kê biên tài sản", "Định giá", "Bán đấu giá", "Cưỡng chế thi hành án"],
  },
  {
    slug: "vo-thanh-thao",
    name: "Võ Thanh Thảo",
    role: "Thư ký nghiệp vụ",
    image: "/images/team/member-5.webp",
    intro: "Thư ký nghiệp vụ phụ trách lập vi bằng và tống đạt.",
    leadTitle: "Nhanh chóng, chính xác",
    lead: "Chị Thảo phụ trách tiếp nhận yêu cầu lập vi bằng, tống đạt và hỗ trợ chấp hành viên trong nghiệp vụ hằng ngày.",
    experience: "Chị có mặt nhanh chóng khi khách hàng cần, ghi nhận sự kiện đầy đủ và hoàn thiện hồ sơ đúng hạn.",
    quote: "Sự chính xác trong từng chi tiết nhỏ tạo nên giá trị của chứng cứ.",
    skills: ["Lập vi bằng", "Tống đạt", "Hồ sơ nghiệp vụ"],
  },
  {
    slug: "dang-minh-chau",
    name: "Đặng Minh Châu",
    role: "Chuyên viên pháp lý",
    image: "/images/team/member-6.webp",
    intro: "Chuyên viên pháp lý phụ trách tư vấn và tiếp nhận hồ sơ.",
    leadTitle: "Người lắng nghe đầu tiên",
    lead: "Chị Châu là người tiếp nhận và tư vấn ban đầu cho khách hàng, giúp họ hiểu rõ quyền lợi và thủ tục cần thiết.",
    experience: "Chị giải thích các vấn đề pháp lý phức tạp bằng ngôn ngữ dễ hiểu và luôn theo sát khách hàng đến khi hồ sơ được tiếp nhận.",
    quote: "Hiểu đúng ngay từ đầu giúp khách hàng tiết kiệm rất nhiều thời gian và chi phí.",
    skills: ["Tư vấn pháp lý", "Tiếp nhận hồ sơ", "Xác minh điều kiện thi hành án"],
  },
  {
    slug: "huynh-duc-tai",
    name: "Huỳnh Đức Tài",
    role: "Thư ký nghiệp vụ",
    image: "/images/team/member-7.webp",
    intro: "Thư ký nghiệp vụ phụ trách xác minh và phối hợp liên ngành.",
    leadTitle: "Cầu nối hiệu quả",
    lead: "Anh Tài phụ trách xác minh điều kiện thi hành án và phối hợp với các cơ quan, tổ chức liên quan.",
    experience: "Anh có mạng lưới phối hợp rộng, giúp rút ngắn đáng kể thời gian xác minh cho mỗi hồ sơ.",
    quote: "Thông tin đầy đủ là nền móng của mọi quyết định đúng.",
    skills: ["Xác minh tài sản", "Phối hợp liên ngành", "Tống đạt"],
  },
  {
    slug: "bui-ngoc-han",
    name: "Bùi Ngọc Hân",
    role: "Chuyên viên pháp lý",
    image: "/images/team/member-8.webp",
    intro: "Chuyên viên pháp lý phụ trách hồ sơ đất đai và nhà ở.",
    leadTitle: "Vững vàng về đất đai",
    lead: "Chị Hân hỗ trợ các hồ sơ liên quan đến quyền sử dụng đất, nhà ở và tài sản gắn liền với đất.",
    experience: "Chị nắm chắc quy định về đất đai, giúp xử lý các vướng mắc về giấy tờ, ranh giới và hiện trạng tài sản.",
    quote: "Đất đai là tài sản lớn của mỗi gia đình, nên mọi bước phải thật cẩn trọng.",
    skills: ["Đất đai & nhà ở", "Lập vi bằng hiện trạng", "Tư vấn pháp lý"],
  },
];

export type CaseStudy = {
  slug: string;
  title: string;
  area: string;
  client: string;
  outcome: string;
  image: string;
  intro: string;
  sections: { title: string; items: string[]; after?: string }[];
  review: { text: string; name: string; role: string; avatar: string };
};

// MẪU: illustrative cases, replace with real (anonymised) matters.
export const cases: CaseStudy[] = [
  {
    slug: "thu-hoi-no-tin-dung",
    title: "Thu hồi khoản nợ tín dụng quá hạn",
    area: "Tín dụng ngân hàng",
    client: "Ngân hàng TMCP",
    outcome: "Thu hồi 1,5 tỷ đồng",
    image: "/images/cases/case-1.webp",
    intro: "Khoản vay có tài sản bảo đảm đã quá hạn nhiều năm, bản án có hiệu lực nhưng chưa được thi hành do người phải thi hành án liên tục trì hoãn.",
    sections: [
      {
        title: "Thách thức chính",
        items: ["Tài sản bảo đảm đã thay đổi hiện trạng", "Người phải thi hành án không hợp tác", "Có người thứ ba đang sử dụng tài sản"],
        after: "Văn phòng xây dựng kế hoạch thi hành chi tiết, ưu tiên vận động trước khi áp dụng biện pháp cưỡng chế.",
      },
      {
        title: "Biện pháp đã thực hiện",
        items: ["Xác minh lại toàn bộ hiện trạng tài sản", "Làm việc với người đang sử dụng tài sản", "Tổ chức kê biên và thẩm định giá", "Bán đấu giá công khai"],
      },
      {
        title: "Kết quả",
        items: ["Thu hồi đủ khoản nợ gốc và lãi theo bản án", "Hoàn tất trong 5 tháng kể từ khi tiếp nhận"],
      },
    ],
    review: {
      text: "Hồ sơ tồn đọng lâu năm đã được xử lý dứt điểm, đúng luật và rất chuyên nghiệp.",
      name: "Đại diện ngân hàng",
      role: "Phòng xử lý nợ",
      avatar: "/images/avatars/avatar-1.webp",
    },
  },
  {
    slug: "chia-tai-san-hon-nhan",
    title: "Thi hành án chia tài sản sau ly hôn",
    area: "Hôn nhân & gia đình",
    client: "Chị N.T.H",
    outcome: "Hoàn tất bàn giao tài sản",
    image: "/images/cases/case-2.webp",
    intro: "Sau khi Tòa án tuyên chia tài sản chung, các bên không thống nhất được việc bàn giao nhà đất và các tài sản khác.",
    sections: [
      {
        title: "Thách thức chính",
        items: ["Nhiều tài sản cần định giá lại", "Mâu thuẫn gay gắt giữa các bên", "Có con nhỏ cần được bảo vệ quyền lợi"],
        after: "Chấp hành viên tổ chức nhiều buổi làm việc để các bên thỏa thuận phương án bàn giao phù hợp.",
      },
      {
        title: "Biện pháp đã thực hiện",
        items: ["Tổ chức đối thoại giữa các bên", "Lập vi bằng hiện trạng tài sản", "Giám sát việc bàn giao"],
      },
      {
        title: "Kết quả",
        items: ["Các bên tự nguyện thỏa thuận bàn giao", "Không phải áp dụng biện pháp cưỡng chế"],
      },
    ],
    review: {
      text: "Tôi được hỗ trợ tận tình trong giai đoạn khó khăn nhất. Mọi thứ được giải quyết êm thấm.",
      name: "Chị N.T.H",
      role: "Người được thi hành án",
      avatar: "/images/avatars/avatar-8.webp",
    },
  },
  {
    slug: "tranh-chap-ranh-gioi-dat",
    title: "Thi hành án tranh chấp ranh giới đất",
    area: "Đất đai & nhà ở",
    client: "Hộ gia đình ông T.V.L",
    outcome: "Giao đất đúng bản án",
    image: "/images/cases/case-3.webp",
    intro: "Bản án xác định lại ranh giới giữa hai thửa đất liền kề nhưng việc giao đất trên thực địa gặp nhiều vướng mắc.",
    sections: [
      {
        title: "Thách thức chính",
        items: ["Mốc giới thực địa không rõ ràng", "Có công trình xây dựng lấn sang phần đất", "Các bên không hợp tác đo đạc"],
      },
      {
        title: "Biện pháp đã thực hiện",
        items: ["Phối hợp cơ quan đo đạc xác định mốc giới", "Vận động tháo dỡ công trình lấn chiếm", "Tổ chức giao đất có chính quyền chứng kiến"],
      },
      {
        title: "Kết quả",
        items: ["Giao đất đúng diện tích theo bản án", "Cắm mốc giới rõ ràng, lập biên bản đầy đủ"],
      },
    ],
    review: {
      text: "Mảnh đất của gia đình đã được trả lại đúng như bản án. Cảm ơn Văn phòng rất nhiều.",
      name: "Ông T.V.L",
      role: "Người được thi hành án",
      avatar: "/images/avatars/avatar-3.jpg",
    },
  },
  {
    slug: "cong-no-hop-dong-thuong-mai",
    title: "Thu hồi công nợ hợp đồng thương mại",
    area: "Kinh doanh thương mại",
    client: "Công ty TNHH (Quảng Ngãi)",
    outcome: "Thu hồi 2,5 tỷ đồng",
    image: "/images/cases/case-4.webp",
    intro: "Doanh nghiệp đối tác không thanh toán tiền hàng dù đã có phán quyết buộc thanh toán.",
    sections: [
      {
        title: "Thách thức chính",
        items: ["Đối tác chuyển tài sản sang pháp nhân khác", "Nhiều tài khoản ngân hàng cần xác minh"],
      },
      {
        title: "Biện pháp đã thực hiện",
        items: ["Xác minh tài khoản và tài sản", "Phong tỏa tài khoản theo quy định", "Làm việc trực tiếp với ban giám đốc đối tác"],
      },
      {
        title: "Kết quả",
        items: ["Đối tác thanh toán toàn bộ khoản nợ", "Hai bên tiếp tục duy trì quan hệ kinh doanh"],
      },
    ],
    review: {
      text: "Chúng tôi thu hồi được công nợ mà vẫn giữ được quan hệ đối tác. Rất đáng tin cậy.",
      name: "Giám đốc doanh nghiệp",
      role: "Người được thi hành án",
      avatar: "/images/avatars/avatar-2.webp",
    },
  },
];

// MẪU: replace with real, consented client feedback (or remove the section).
export const reviews = [
  {
    text: "Sự hỗ trợ tôi nhận được thật sự xuất sắc từ đầu đến cuối. Lời khuyên rõ ràng và cách làm có chiến lược giúp tôi hoàn toàn yên tâm.",
    name: "Anh Hoàng Long",
    role: "Chủ doanh nghiệp",
    avatar: "/images/avatars/avatar-1.webp",
  },
  {
    text: "Hồ sơ của tôi được xử lý tận tâm và chuyên nghiệp. Mọi bước đều được giải thích rõ ràng, quá trình diễn ra suôn sẻ, nhẹ nhàng.",
    name: "Chị Mỹ Duyên",
    role: "Nhân viên văn phòng",
    avatar: "/images/avatars/avatar-2.webp",
  },
  {
    text: "Văn phòng phản hồi rất nhanh, có mặt đúng hẹn khi lập vi bằng. Tôi sẽ tiếp tục sử dụng dịch vụ.",
    name: "Anh Quốc Bảo",
    role: "Kinh doanh bất động sản",
    avatar: "/images/avatars/avatar-3.jpg",
  },
  {
    text: "Chi phí được báo rõ từ đầu, không phát sinh. Kết quả vượt mong đợi của gia đình tôi.",
    name: "Chị Thanh Tâm",
    role: "Giáo viên",
    avatar: "/images/avatars/avatar-4.jpg",
  },
];

export const rating = { score: "4,9", count: "356 đánh giá" };

export const steps = [
  { title: "Tư vấn miễn phí", text: "Trao đổi bảo mật để hiểu rõ hồ sơ và quyền lợi của bạn." },
  { title: "Tiếp nhận hồ sơ", text: "Xây dựng phương án thi hành phù hợp với từng vụ việc." },
  { title: "Tổ chức thi hành", text: "Xác minh, làm việc với các bên và áp dụng biện pháp cần thiết." },
  { title: "Hoàn tất & đồng hành", text: "Kết thúc hồ sơ và tiếp tục hỗ trợ khi bạn cần." },
];

export const faqs = [
  {
    q: "Làm thế nào để đặt lịch tư vấn?",
    a: "Bạn có thể đặt lịch qua biểu mẫu trên website hoặc liên hệ trực tiếp qua điện thoại, email. Chúng tôi sẽ phản hồi sớm để xác nhận lịch hẹn.",
  },
  {
    q: "Văn phòng nhận những loại hồ sơ nào?",
    a: "Chúng tôi tổ chức thi hành các bản án, quyết định dân sự theo yêu cầu; xác minh điều kiện thi hành án; tống đạt giấy tờ; lập vi bằng và tư vấn pháp lý liên quan.",
  },
  {
    q: "Buổi tư vấn đầu tiên có mất phí không?",
    a: "Buổi tư vấn ban đầu hoàn toàn miễn phí. Bạn sẽ được nghe phân tích hồ sơ và phương án đề xuất trước khi quyết định.",
  },
  {
    q: "Một hồ sơ thi hành án thường mất bao lâu?",
    a: "Thời gian phụ thuộc vào tính chất vụ việc và điều kiện thi hành án của người phải thi hành. Chúng tôi luôn báo trước lộ trình dự kiến và cập nhật tiến độ thường xuyên.",
  },
  {
    q: "Chi phí dịch vụ được tính như thế nào?",
    a: "Chi phí được thỏa thuận rõ ràng bằng văn bản trước khi thực hiện, căn cứ theo quy định và khối lượng công việc thực tế. Không có khoản phát sinh ngoài thỏa thuận.",
  },
];

/** Rotating panel in the home "Về Văn phòng" section. Icons: /public/images/icons/about-N.svg. */
export const pillars = [
  {
    icon: "/images/icons/about-1.svg",
    title: "Sứ mệnh",
    text: "Tổ chức thi hành án chất lượng, rõ ràng, tận tâm và hướng đến kết quả tốt nhất cho mọi đương sự.",
  },
  {
    icon: "/images/icons/about-2.svg",
    title: "Tầm nhìn",
    text: "Trở thành văn phòng thi hành án dân sự được tin cậy hàng đầu tại Quảng Ngãi và khu vực miền Trung.",
  },
  {
    icon: "/images/icons/about-3.svg",
    title: "Cam kết với bạn",
    text: "Chúng tôi không đo thành công bằng số giờ làm việc. Mỗi phương án đều xoay quanh mục tiêu, thời gian và chi phí của bạn, minh bạch ở từng bước.",
  },
];

export const values = [
  { title: "Khách hàng là trọng tâm", text: "Mọi quyết định đều hướng đến kết quả tốt nhất cho người yêu cầu." },
  { title: "Chính trực tuyệt đối", text: "Tư vấn trung thực, rõ ràng, kể cả trong những tình huống khó." },
  { title: "Thực thi xuất sắc", text: "Giải pháp chính xác, được chuẩn bị kỹ lưỡng đến từng chi tiết." },
  { title: "Hướng đến kết quả", text: "Tập trung vào kết quả thực chất bằng chiến lược và kinh nghiệm." },
];

export const founder = {
  name: "Nguyễn Văn An",
  image: "/images/founder.webp",
  bio: "Ông An thành lập Văn phòng sau nhiều năm công tác trong ngành thi hành án dân sự, với mong muốn mang đến dịch vụ thi hành án tận tâm, minh bạch cho người dân Quảng Ngãi.",
  memberships: ["Chấp hành viên", "Thạc sĩ Luật", "Hội Luật gia", "Trọng tài viên"],
  qualifications: [
    "Cử nhân Luật – Đại học Luật Hà Nội",
    "Thạc sĩ Luật Dân sự – Đại học Luật TP.HCM",
    "Chứng chỉ nghiệp vụ Chấp hành viên",
    "Chứng chỉ Đấu giá viên",
  ],
};

export const story = [
  {
    title: "Câu chuyện của chúng tôi",
    text: "Văn phòng ra đời từ một niềm tin: mọi người dân đều xứng đáng được hỗ trợ thi hành án tận tâm, nhanh chóng và minh bạch.",
  },
  {
    title: "Tầm nhìn",
    text: "Trở thành văn phòng thi hành án dân sự được tin cậy hàng đầu tại Quảng Ngãi và khu vực miền Trung.",
  },
  {
    title: "Sứ mệnh",
    text: "Biến bản án, quyết định trên giấy thành kết quả thực tế cho đương sự, trên nền tảng đúng pháp luật.",
  },
];

// MẪU
export const awards = [
  { title: "Văn phòng tiêu biểu", note: "UBND tỉnh · 2024" },
  { title: "Đơn vị hoàn thành xuất sắc", note: "Sở Tư pháp · 2023" },
  { title: "Dịch vụ pháp lý tin cậy", note: "Bình chọn · 2022 – 2024" },
  { title: "Giấy khen công tác", note: "Sở Tư pháp · 2022" },
  { title: "Top dịch vụ được yêu thích", note: "Khảo sát khách hàng · 2024" },
];

// MẪU: offices / branches shown on the contact page.
export const offices = [
  { label: "Trụ sở chính", city: "TP. Quảng Ngãi", address: office.address, image: "/images/offices/office-1.webp" },
  { label: "Điểm tiếp nhận", city: "Đức Phổ", address: "Số 00 Đường ABC, Đức Phổ, Quảng Ngãi", image: "/images/offices/office-2.webp" },
  { label: "Điểm tiếp nhận", city: "Bình Sơn", address: "Số 00 Đường ABC, Bình Sơn, Quảng Ngãi", image: "/images/offices/office-3.webp" },
];

export const partnerLogos = ["01", "02", "03", "04", "05", "06", "07", "08", "09"].map(
  (n) => `/images/icons/partner-${n}.svg`,
);
