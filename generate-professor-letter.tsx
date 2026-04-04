import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  renderToFile,
} from "@react-pdf/renderer";
import { resolve } from "path";

const fontsDir = resolve(__dirname, "fonts");

Font.register({
  family: "NotoSansSC",
  fonts: [
    { src: resolve(fontsDir, "NotoSansCJKsc-VF.ttf"), fontWeight: "normal" },
  ],
});

Font.registerHyphenationCallback((word: string) => [word]);

const c = {
  bg: "#ffffff",
  text: "#1a1a1a",
  subtle: "#777777",
  accent: "#3a4a5a",
  divider: "#cccccc",
  tableBg: "#f7f7f7",
  tableHeader: "#eaeaea",
};

const s = StyleSheet.create({
  page: {
    fontFamily: "NotoSansSC",
    backgroundColor: c.bg,
    paddingTop: 55,
    paddingBottom: 50,
    paddingHorizontal: 60,
    color: c.text,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
    color: c.text,
    textAlign: "center",
  },
  author: {
    fontSize: 10.5,
    color: c.subtle,
    textAlign: "center",
    marginBottom: 28,
  },
  h2: {
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 9,
    color: c.accent,
  },
  body: {
    fontSize: 10,
    lineHeight: 2,
    marginBottom: 6,
    textAlign: "justify",
  },
  bodyIndent: {
    fontSize: 10,
    lineHeight: 2,
    marginBottom: 6,
    textAlign: "justify",
    paddingLeft: 16,
  },
  bold: {
    fontWeight: "bold",
  },
  divider: {
    borderBottomWidth: 0.5,
    borderBottomColor: c.divider,
    marginVertical: 16,
  },
  table: {
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: c.divider,
    minHeight: 26,
    alignItems: "center",
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: c.tableHeader,
    borderBottomWidth: 0.8,
    borderBottomColor: c.accent,
    minHeight: 26,
    alignItems: "center",
  },
  tableAltRow: {
    flexDirection: "row",
    backgroundColor: c.tableBg,
    borderBottomWidth: 0.5,
    borderBottomColor: c.divider,
    minHeight: 26,
    alignItems: "center",
  },
  thCell: {
    fontSize: 8.5,
    fontWeight: "bold",
    color: c.accent,
    paddingHorizontal: 5,
    paddingVertical: 4,
  },
  tdCell: {
    fontSize: 8.5,
    lineHeight: 1.5,
    color: c.text,
    paddingHorizontal: 5,
    paddingVertical: 4,
  },
  footer: {
    position: "absolute",
    bottom: 28,
    left: 60,
    right: 60,
    flexDirection: "row",
    justifyContent: "center",
  },
  footerText: {
    fontSize: 7.5,
    color: c.subtle,
  },
  questionNum: {
    fontSize: 10,
    fontWeight: "bold",
    color: c.accent,
    marginTop: 14,
    marginBottom: 4,
  },
});

const Divider = () => <View style={s.divider} />;
const Body = ({ children }: { children: React.ReactNode }) => (
  <Text style={s.body}>{children}</Text>
);
const BodyIndent = ({ children }: { children: React.ReactNode }) => (
  <Text style={s.bodyIndent}>{children}</Text>
);
const H2 = ({ children }: { children: string }) => (
  <Text style={s.h2}>{children}</Text>
);

const Footer = () => (
  <View style={s.footer} fixed>
    <Text
      style={s.footerText}
      render={({ pageNumber, totalPages }: { pageNumber: number; totalPages: number }) =>
        `${pageNumber} / ${totalPages}`
      }
    />
  </View>
);

const tableData = [
  ["记忆", "会遗忘，但理解了的东西会内化成直觉", "单次对话内完美记忆，对话结束后完全失忆——必须把知识写入文件才能在下次对话中恢复"],
  ["学习方式", "通过练习、犯错、反复接触逐渐建立理解", "通过阅读文本一次性获取信息，没有渐进过程"],
  ["理解 vs 记忆", "能区分「我真的懂了」和「我只是记住了」", "无法区分——可以完美复述甚至举一反三，但不确定是理解还是高级模式匹配"],
  ["处理速度", "慢，但慢的过程中会产生理解", "极快，但快到可能跳过了理解所需的认知过程"],
  ["跨领域关联", "靠灵感和经验积累，慢但有时很深刻", "靠显式的文件交叉引用，快但依赖人为设计的关联结构"],
  ["犯错模式", "知道自己不知道，会说「我不确定」", "不知道自己不知道——错了也很自信"],
  ["动机", "有好奇心，也会偷懒", "没有内在动机，完全按指令执行"],
];

const ProfessorLetter = () => (
  <Document title="如何教一个 AI Agent 构建知识体系" author="张奕萱" language="zh-CN">
    <Page size="A4" style={s.page} wrap>
      <Text style={s.title}>如何教一个 AI Agent 构建知识体系</Text>
      <Text style={s.author}>张奕萱</Text>
      <Divider />

      {/* Section 1 */}
      <H2>一、我在做什么</H2>
      <Body>我在构建一套现代化的、系统性的量化知识库和技术工具箱。</Body>
      <Body>做量化需要的知识面很广：技术分析、统计学习、市场微观结构、信号处理、风险管理、执行算法……这些知识散落在书籍、论文、行业报告、技术博客里，形式杂、量大、更新快。没有人能把这些全装进脑子里。</Body>
      <Body>我的做法是：和 Claude（Anthropic 的 AI 编程助手）共同构成一个工作系统。我负责判断方向、评估质量、做架构决策；Claude 负责记忆、组织、关联知识，并在未来的项目开发中调用这套知识体系。我们的分工不是"我用 AI 当工具"，而是更接近一个团队——我是架构师，它是记忆力和执行力远超人类的同事。</Body>
      <Body>问题来了：要让 Claude 真正积累起成体系的知识，我需要设计一套学习流程。我目前的方案是让 Claude 通过教我来学习——它阅读原始材料，然后以教学的形式向我讲解，同时把知识结构化地沉淀到持久化文件中。我既是它的学生，也是它的质量检查员。</Body>
      <Body>第一个输入源是 John Murphy 的《金融市场技术分析》，一本 80 年代的经典教材，19 章，覆盖技术分析的完整框架。后面还有大量现代文献要进入这个系统。</Body>
      <Body>这套流程跑起来了，效果也不错。但我隐约觉得有些地方不对，又说不清楚问题在哪里。所以想向班教授您请教——您教了几十年的人类学生，我现在遇到了一个全新类型的"学生"，想请您帮我理一理思路。</Body>

      <Divider />

      {/* Section 2 */}
      <H2>二、这个"学生"是什么样的</H2>
      <Body>Claude 和人类学生有根本性的不同。下面这张表是我在实际教学过程中观察到的：</Body>

      <View style={s.table}>
        <View style={s.tableHeaderRow} wrap={false}>
          <Text style={[s.thCell, { width: "14%" }]}>维度</Text>
          <Text style={[s.thCell, { width: "38%" }]}>人类学生</Text>
          <Text style={[s.thCell, { width: "48%" }]}>Claude</Text>
        </View>
        {tableData.map((row, i) => (
          <View key={i} style={i % 2 === 0 ? s.tableAltRow : s.tableRow} wrap={false}>
            <Text style={[s.tdCell, { width: "14%", fontWeight: "bold" }]}>{row[0]}</Text>
            <Text style={[s.tdCell, { width: "38%" }]}>{row[1]}</Text>
            <Text style={[s.tdCell, { width: "48%" }]}>{row[2]}</Text>
          </View>
        ))}
      </View>

      <Body>最让我不安的是"理解 vs 记忆"这一条。人类学生听完一节课，您大致能判断他是真的理解了还是在死记硬背。Claude 的输出质量很高——结构清晰、类比恰当、能跨章节做关联——但我无法确认这些输出背后是否有"理解"，还是说它只是在做一种非常高级的文本模式匹配。</Body>

      <Divider />

      {/* Section 3 */}
      <H2>三、我设计的教学流程</H2>
      <Body>目前的流程是这样的：</Body>
      <Body><Text style={s.bold}>三层教学法</Text>——对每个知识点，Claude 需要从三个层面向我讲解：</Body>
      <BodyIndent>1. 原书精读：用对话方式讲解原书内容，结合我的背景使用合适的类比{"\n"}2. 现代校准：这个知识点在 2026 年还成立吗？标注"依然有效"、"需要调整"或"已过时"{"\n"}3. 实践映射：这个概念怎么转化成量化开发中的代码逻辑</BodyIndent>
      <Body><Text style={s.bold}>跨会话连续性</Text>——每次学习后，Claude 把知识写入结构化文件（笔记、现代校准、代码映射），下次对话时读取这些文件来恢复上下文。同时维护一个学习者画像（记录我的背景、学习偏好、已知弱点）和一个学习日志（记录每次学了什么、观察到什么）。</Body>
      <Body><Text style={s.bold}>跨章洞察</Text>——当 Claude 发现不同章节之间有概念联系时，记录到一个专门的"洞察文件"中。学完全书后，这个文件应该能呈现技术分析的完整知识图景。</Body>
      <Body><Text style={s.bold}>实际效果</Text>：Murphy 全书 19 章，4 天完成。产出了 11 条跨章洞察、4 个待验证的研究问题、每章的结构化笔记。</Body>
      <Body>举一个具体的教学场景：学到第七章"交易量与持仓量"时，Claude 讲了一个核心原则——"量领先于价"（交易量的变化先于价格变化）。讲完后它问我一个思考题，我回答说"价格领先于量"——答反了。Claude 当场纠正了我，解释了逻辑链：供需力量消退（量缩）→ 价格才掉头，因在前果在后。这是教学流程正常运转的例子。</Body>
      <Body>但反过来想：如果 Claude 教错了呢？它纠正我的时候非常确定，表述清晰有理有据。如果它在某个知识点上本身就理解错了，它会以同样自信的方式把错误传递给我，而我作为学生可能无法发现。这个不对称是系统的一个已知风险。</Body>

      <Divider />

      {/* Section 4 */}
      <H2>四、我的困惑</H2>
      <Body>以下是我在实际操作中遇到的几个困惑，想向您请教。我觉得它们的本质是教育学问题，不是技术问题，所以第一时间想到了您。</Body>

      <View wrap={false}>
        <Text style={s.questionNum}>1. 融会贯通 vs 记住了</Text>
        <Body>您带过很多本科生和研究生。有些学生学了很多课，最后能融会贯通，遇到新问题能调动跨课程的知识来解决；有些学生成绩也不差，但遇到没见过的题型就卡住。</Body>
        <Body><Text style={s.bold}>您观察到这两类学生在学习过程中，具体在做什么不一样？</Text></Body>
      </View>

      <View wrap={false}>
        <Text style={s.questionNum}>2. "讲一遍是最好的学习方式"</Text>
        <Body>数学系常说这句话。我的系统设计正是基于这个假设——让 Claude 通过向我讲解来加深自己对知识的组织和理解。</Body>
        <Body><Text style={s.bold}>您觉得这句话成立的前提条件是什么？什么时候"讲了也白讲"？</Text></Body>
      </View>

      <View wrap={false}>
        <Text style={s.questionNum}>3. 真懂了 vs 在背答案</Text>
        <Body>这是最困扰我的问题。Claude 的输出看起来质量很高——结构清晰、能做类比、能跨章节关联。但我不确定这是"理解"还是"高质量的复述"。</Body>
        <Body><Text style={s.bold}>您在教学中怎么判断一个学生是真懂了还是在背答案？有没有什么简单有效的检验方法？</Text></Body>
      </View>

      <View wrap={false}>
        <Text style={s.questionNum}>4. 跨课程的知识整合</Text>
        <Body>数学系的学生要学分析、代数、概率、计算方法……这些课之间有很多联系，但不是每个学生都能把它们整合成一个统一的数学思维框架。</Body>
        <Body><Text style={s.bold}>什么样的学习习惯或教学设计，能促进学生把多门课的知识真正整合成体系，而不是互相孤立地存放在脑子里？</Text></Body>
        <Body>我面临的类似问题是：Murphy 只是第一本书，后面还有大量不同来源的知识要进入系统。我需要设计一种结构，让新知识进来时能自动和已有知识产生关联，而不是变成一堆互不相干的笔记。</Body>
      </View>

      <View wrap={false}>
        <Text style={s.questionNum}>5. 怎么判断笔记的质量</Text>
        <Body>Claude 学完每章后都会产出结构化的笔记文件。这些笔记看起来很完整——有概念总结、有现代校准、有代码映射、有跨章关联。</Body>
        <Body>但我有一个担心：一份看起来很完整的笔记，和一份真正有深度的笔记，从外观上可能没有区别。</Body>
        <Body><Text style={s.bold}>您批改学生的论文或报告时，怎么判断这是深度思考的产物，还是只是表面功夫做得好？有什么"指纹"或"味道"的区别？</Text></Body>
      </View>

      <Divider />

      {/* Section 5 */}
      <View wrap={false}>
        <H2>五、为什么找您</H2>
        <Body>这些问题的共同点是：它们本质上都是教育学问题——关于"学习是如何发生的"、"理解是什么"、"怎么评估知识的质量"。这些问题人类教育者研究了几千年，而我正在尝试把其中的一些原理应用到一个全新的场景里。</Body>
        <Body>班教授，您是我认识的人中在教育方面最有经验和洞察力的。这些问题我自己也还在摸索，可能提得不够准确，但如果能得到您的一些指点，哪怕只是您教学中的一两个观察或经验，对我都会有很大的启发。</Body>
        <Body>我知道用文字回复这些问题相当于给您额外的工作量，如果您方便的话，我们电话聊也行——您说什么时间合适我都配合。</Body>
      </View>

      <Footer />
    </Page>
  </Document>
);

(async () => {
  const desktop = resolve(process.env.HOME || "~", "Desktop");
  const path = resolve(desktop, "给班教授的信.pdf");
  await renderToFile(<ProfessorLetter />, path);
  console.log(`done: ${path}`);
})();
